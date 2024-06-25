import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary, deleteFromCloudinary }
    from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";
import { sendMail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import fs from "fs";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ ValidateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, userName, password } = req.body;

    // check is all fields are given.
    if ([userName, fullName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, `All fields are required`);
    }

    // check if the user exists: email, username.
    let existedUser = await User.findOne({ userName });
    if (existedUser) {
        throw new ApiError(409, "User with username already exists");
    }
    existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // check for images: avator, dp.
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // uploading images to cloudinay
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    // console.log("avatar", avatar);

    // check for images: avator, dp.
    if (!avatar) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    // timestamps values will be generated automatically.
    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        password,
        avatar: {
            publicId: avatar.public_id,
            url: avatar.secure_url
        },
        coverImage: {
            publicId: coverImage?.public_id || "",
            url: coverImage?.secure_url || ""
        }
    });

    // check for user creation
    const createdUser = await User.findById(user._id)
        ?.select("userName fullName email avatar coverImage isVerified");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // email verification
    const mail = await sendMail("jugnubhai47@gmail.com", "VERIFY", createdUser._id);

    return res.status(201).json(
        new ApiResponse(200, null, "A verification link has been sent to your email. Please verify to log in.")
    )
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    // check if the user is verified.
    if (!user?.isVerified) {
        const mail = await sendMail("jugnubhai47@gmail.com", "VERIFY", user._id);

        throw new ApiError(401, "A verification link has been sent to your email. Please verify to log in.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id)
        ?.select("userName fullName email avatar coverImage isVerified");
    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in the user");
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken },
                "User logged in successful")
        );
});


const confirmUserEmailVerification = asyncHandler(async (req, res) => {
    const { token } = req.query;
    if (!token) {
        throw new ApiError(400, "Invalid token");
    }

    console.log("token", token);

    const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() }
    });
    if (!user) {
        throw new ApiError(401, "Invalid token or token expired");
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save({ ValidateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, null, "Email verified successfully")
    );
});


const validatePasswordResetToken = asyncHandler(async (req, res) => {
    const { token } = req.query;
    if (!token) {
        throw new ApiError(400, "Invalid token");
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: { $gt: Date.now() }
    });
    if (!user) {
        throw new ApiError(401, "Invalid token or token expired");
    }

    return res.status(200).json(
        new ApiResponse(200, token, "Token verified successfully")
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token) {
        throw new ApiError(400, "Invalid token");
    }

    // check if the new password and confirm password are same.
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    const user = await User.findOneAndUpdate(
        {
            resetPasswordToken: token,
            resetPasswordTokenExpiry: { $gt: Date.now() }
        },
        {
            $set: { password: newPassword },
            $unset: { resetPasswordToken: "", resetPasswordTokenExpiry: "" },
        },
        { new: true }
    )
    if (!user) {
        throw new ApiError(401, "Invalid token or token expired");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Password reset successful")
    );
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" }
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});


const suggestAvailableUserName = asyncHandler(async (req, res) => {
    const { prefix } = req.query;
    if (!prefix) {
        throw new ApiError(400, "Prefix is required");
    }

    const availableUsername = await findAvailableUsername(prefix);
    return res.status(200).json(
        new ApiResponse(200, { availableUsername }, "Available username found")
    );
});

const findAvailableUsername = asyncHandler(async (prefix) => {
    const prefixRegex = new RegExp(`^${prefix}\\d+$`);

    const results = await collection.aggregate([
        {
            $match: {
                handle: { $regex: prefixRegex }
            }
        },
        {
            $project: {
                suffix: {
                    $toInt: {
                        $substr: ["$handle", { $strLenCP: prefix }, -1]
                    }
                }
            }
        },
        {
            $sort: { suffix: 1 }
        }
    ]).toArray();

    let expectedSuffix = 1;
    for (const result of results) {
        if (result.suffix !== expectedSuffix) {
            break;
        }
        expectedSuffix++;
    }

    return `${prefix}${expectedSuffix}`;
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        // verify the refresh token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        // find the user and check if the user exists
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(decodedToken._id);

        let loggedInUser = user.toObject();

        // Delete the password and refreshToken properties
        delete loggedInUser.password;
        delete loggedInUser.refreshToken;

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookies("accessToken", accessToken, options)
            .cookies("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }), "Access token refreshed successfully");

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});


const UpdateUserPassword = asyncHandler(async (req, res) => {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(currentPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password cannot be same as old password");
    }

    const updatedUser = await User.findByIdAndUpdate(user._id,
        { password: newPassword }, { new: true }
    )?.select("userName fullName email avatar coverImage isVerified");


    return res.status(200).json(
        new ApiResponse(200, { user: updatedUser },
            "Password changed successful")
    );
});


const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, { user: req?.user }, "User found")
    );
});


// controller to update user account details like fullName, userName
const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullName, userName } = req.body;
    if (!fullName?.trim() || !userName?.trim()) {
        throw new ApiError(400, "FullName and username are required");
    }

    // check if the username already exists.
    const existedUser = await User.findOne({ userName: userName.toLowerCase() });
    if (existedUser) {
        throw new ApiError(409, "Username already exists");
    }

    // update the user profile.
    const user = await User.findByIdAndUpdate(req?.user?._id,
        { $set: { fullName, userName: userName.toLowerCase() } },
        { new: true }
    )?.select("userName fullName email avatar coverImage isVerified");

    if (!user) {
        throw new ApiError(500, "Something went wrong while updating the user profile");
    }

    return res.status(200).json(
        new ApiResponse(200, { user }, "User profile updated successfully")
    );
});


const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req?.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // delete the old cover image from cloudinary if exists.
    if (req?.user?.avatar?.publicId) {
        const oldAvatar = await deleteFromCloudinary(req?.user?.avatar?.publicId, "image");

        // check if the old cover image is deleted successfully.
        if (!oldAvatar) {
            fs.unlinkSync(avatarLocalPath);
            throw new ApiError(500, "Failed to delete old avatar image from cloudinary");
        }
    }

    // uploading images to cloudinay and updating the user profile.
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    const user = await User.findByIdAndUpdate(req?.user?._id,
        { $set: { avatar: { publicId: avatar.public_id, url: avatar.secure_url } } },
        { new: true }
    )?.select("userName fullName email avatar coverImage isVerified");

    return res.status(200).json(
        new ApiResponse(200, { user }, "Avatar updated successfully")
    );
});


const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req?.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required");
    }

    // delete the old cover image from cloudinary if exists.
    if (req?.user?.coverImage?.publicId) {
        const oldCoverImage = await deleteFromCloudinary(req?.user?.coverImage?.publicId, "image");

        // check if the old cover image is deleted successfully.
        if (!oldCoverImage) {
            fs.unlinkSync(coverImageLocalPath);
            throw new ApiError(500, "Failed to delete old cover image from cloudinary");
        }
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    const user = await User.findByIdAndUpdate(req?.user?._id,
        { $set: { coverImage: { publicId: coverImage.public_id, url: coverImage.secure_url } } },
        { new: true }
    )?.select("userName fullName email avatar coverImage isVerified");

    return res.status(200).json(
        new ApiResponse(200, { user }, "Cover image updated successfully")
    );
});


const getUserChannelPage = asyncHandler(async (req, res) => {
    const { userName } = req.params;
    if (!userName) {
        throw new ApiError(404, "Username is missing");
    }

    const channel = await User.aggregate([
        { $match: { userName: userName.toLowerCase() } },
        { $lookup: { from: "Subscription", localField: "_id", foreignField: "channelId", as: "subscribers" } },
        { $lookup: { from: "Subscription", localField: "_id", foreignField: "subscriberId", as: "subscribedTo" } },
        {
            $addFields: {
                subscriberCount: { $size: "$subscribers" },
                subscribedToCount: { $size: "$subscribedTo" },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true, else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                email: 1,
                avatar: 1,
                coverImage: 1,
                subscriberCount: 1,
                subscribedToCount: 1,
                isSubscribed: 1,
            }
        }
    ]);

    console.log("channel", channel);
    if (!channel?.length) {
        throw new ApiError(404, "Channel does not exists");
    }

    return res.status(200).json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});


const getWatchHistory = asyncHandler(async (req, res) => {
    // check if the user id is valid.
    if (!isValidObjectId(req?.user?._id)) {
        throw new ApiError(400, "Invalid user id");
    }
    const userId = new mongoose.Types.ObjectId(req?.user?._id);

    const user = await User.aggregate([
        { $match: { _id: userId } },
        { $unwind: "$watchHistory" },
        { $addFields: { watchedAt: "$watchHistory.watchedAt" } },
        {
            $lookup: {
                from: "Video",
                localField: "watchHistory.videoId",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "User",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [{
                                $project: {
                                    fullName: 1,
                                    userName: 1,
                                    avatar: 1
                                }
                            }]
                        }
                    },
                    { $addFields: { owner: { $arrayElemAt: ["$owner", 0] } } },
                ]
            }
        },
        { $addFields: { watchHistory: { $arrayElemAt: ["$watchHistory", 0] } } },
        { $addFields: { 'watchHistory.watchedAt': "$watchedAt" } },
        { $group: { _id: "$_id", watchHistory: { $push: "$watchHistory" } } },
        { $project: { watchHistory: 1 } }
    ]);

    if (!user?.length) {
        throw new ApiError(404, "Watch history not found");
    }

    // sort by watchedAt.
    user[0].watchHistory.sort((a, b) => new Date(b.watchedAt) - new Date(a.watchedAt));

    return res.status(200).json(
        new ApiResponse(200, user[0].watchHistory, "Watch history fetched successfully")
    );
})


export {
    registerUser, loginUser, logoutUser, refreshAccessToken,
    UpdateUserPassword, getCurrentUser, updateUserDetails,
    updateUserCoverImage, updateUserAvatar, getUserChannelPage,
    getWatchHistory, confirmUserEmailVerification,
    validatePasswordResetToken, resetPassword
};
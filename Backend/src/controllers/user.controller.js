import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import fs from "fs";


export const generateAccessAndRefreshToken = async (userId) => {
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


export const registerUser = asyncHandler(async (req, res) => {

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
    console.log("avatar", avatar);

    // check for images: avator, dp.
    if (!avatar?.url) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    // timestamps values will be generated automatically.
    // Creating entry/document in database.
    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        password,
        avatar: {
            publicId: avatar.public_id,
            url: avatar.url
        },
        coverImage: {
            publicId: coverImage?.public_id || "",
            url: coverImage?.url || ""
        }
    });

    // check for user creation
    const createdUser = await User.findById(user._id)?.select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Give response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});


export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    // console.log("req.body", req.body);

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    let loggedInUser = user.toObject();

    // Delete the password and refreshToken properties
    delete loggedInUser.password;
    delete loggedInUser.refreshToken;

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successful")
        );
});


export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: undefined }
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


export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        // verify the refresh token
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        // find the user
        const user = await User.findById(decodedToken?._id);

        // check if the user exists
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

export const changeUserPassword = asyncHandler(async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    console.log("req.body", req.body);

    if (!email.trim()) {
        throw new ApiError(400, "Email is required");
    }

    // find and check if the user exists.
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // check password.
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect password");
    }

    // check if the new password and confirm password are same.
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "New password and confirm password do not match");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password cannot be same as old password");
    }

    // update the password.
    user.password = newPassword;
    await user.save({ ValidateBeforeSave: false });

    const existedUser = user.toObject();

    // Delete the password and refreshToken properties
    delete existedUser.password;
    delete existedUser.refreshToken;

    return res.status(200).json(
        new ApiResponse(200, { user: existedUser },
            "Password changed successful")
    );
});


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, { user: req?.user }, "User found")
    );
});


export const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, userName } = req.body;

    if (!fullName.trim() || !userName.trim()) {
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
        { new: true }).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(500, "Something went wrong while updating the user profile");
    }

    return res.status(200).json(
        new ApiResponse(200, { user }, "User profile updated successfully")
    );
});


export const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req?.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // delete the old cover image from cloudinary if exists.
    if (req?.user?.coverImage?.publicId) {
        const oldCoverImage = await deleteFromCloudinary(req?.user?.coverImage?.publicId, "image");

        // check if the old cover image is deleted successfully.
        if (oldCoverImage?.result !== "ok") {
            fs.unlinkSync(coverImageLocalPath);
            throw new ApiError(500, "Failed to delete old cover image from cloudinary");
        }
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar?.url) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    const user = await User.findByIdAndUpdate(req?.user?._id,
        { $set: { avatar: { publicId: avatar.public_id, url: avatar.url } } },
        { new: true }).select("-password -refreshToken");

    return res.status(200).json(
        ApiResponse(200, { user }, "Avatar updated successfully")
    );
});


export const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req?.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required");
    }

    // delete the old cover image from cloudinary if exists.
    if (req?.user?.coverImage?.publicId) {
        const oldCoverImage = await deleteFromCloudinary(req?.user?.coverImage?.publicId, "auto");

        // check if the old cover image is deleted successfully.
        if (oldCoverImage?.result !== "ok") {
            fs.unlinkSync(coverImageLocalPath);
            throw new ApiError(500, "Failed to delete old cover image from cloudinary");
        }
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage?.url) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    const user = await User.findByIdAndUpdate(req?.user?._id,
        { $set: { coverImage: { publicId: coverImage.public_id, url: coverImage.url } } },
        { new: true }).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, { user }, "Cover image updated successfully")
    );
});
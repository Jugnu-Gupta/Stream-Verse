import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


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
        return null;
    }
}

const registerUser = asyncHandler(async (req, res) => {

    // fetch data.
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

    // console.log("files", req.files);
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    // check for images: avator, dp.
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // uploading images to cloudinay
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // check for images: avator, dp.
    if (!avatar) {
        throw new ApiError(500, "Image upload failed on cloudinary");
    }

    // timestamps values will be generated automatically.
    // Creating entry/document in database.
    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });
    // console.log("user", user);

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


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    console.log("req.body", req.body);

    const user = await User.findOne({ email });

    if (!email) {
        throw new ApiError(400, "Email is required");
    }
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

const logoutUser = asyncHandler(async (req, res) => {
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


const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

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

export { registerUser, loginUser, logoutUser, refreshAccessToken };
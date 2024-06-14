import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // fetch data.
    const { fullName, email, userName, password } = req.body;

    // check is all fields are given.
    if ([userName, fullName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, `All fields are required`);
    }

    // const existedUser = User.findOne({
    //     $or: [{ userName }, { email }]
    // });

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
    // console.log("createdUser", createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // delete password and refreshToken;
    // delete createdUser.password;
    // delete createdUser.refreshToken;

    // console.log("createdUser", createdUser);

    // Give response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

export { registerUser };
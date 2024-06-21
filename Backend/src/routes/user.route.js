import { imageUploader } from "../middlewares/multer.middleware.js"
import {
    loginUser, logoutUser, registerUser, refreshAccessToken,
    UpdateUserPassword, getCurrentUser, updateUserCoverImage,
    getUserChannelPage, updateUserDetails, verifyEmail,
    updateUserAvatar, getWatchHistory
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Register user
router.route("/register").
    post(imageUploader.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), registerUser);

// Login user
router.route("/login").post(loginUser);

// verify email
router.route("/verify/:token").get(verifyEmail);

// reset password
router.route("/reset/:token").get(verifyEmail);

// Refresh access token
router.route("/refresh-Token").post(refreshAccessToken);

// Logout user (secured route)
router.route("/logout").post(verifyJWT, logoutUser);

// Get current user (secured route), Update user details (secured route)
router.route("/account")
    .get(verifyJWT, getCurrentUser)
    .patch(verifyJWT, updateUserDetails)

// Change user password (secured route)
router.route("/account/password").patch(verifyJWT, UpdateUserPassword);

// Update user avatar (secured route)
router.route("/account/avatar").patch(verifyJWT,
    imageUploader.single('avatar'), updateUserAvatar);

// Update user cover image (secured route)
router.route("/account/cover-image").patch(verifyJWT,
    imageUploader.single('coverImage'), updateUserCoverImage);

// Get channel page by username (secured route)
router.route("/channel-page/:userName").get(verifyJWT, getUserChannelPage);

// Get watch history (secured route)
router.route("/watch-history").get(verifyJWT, getWatchHistory);


export default router;
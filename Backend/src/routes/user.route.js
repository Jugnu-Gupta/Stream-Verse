import { upload } from "../middlewares/multer.middleware.js"
import {
    loginUser, logoutUser, registerUser, refreshAccessToken,
    UpdateUserPassword, getCurrentUser, updateUserCoverImage,
    getUserChannelPage, updateUserDetails, updateUserAvatar,
    getWatchHistory, confirmUserEmailVerification,
    validatePasswordResetToken, resetPassword
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Register user
router.route("/register").
    post(upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), registerUser);

// Login user
router.route("/login").post(loginUser);

// verify email
router.route("/email-verification").get(confirmUserEmailVerification);
// router.route("/email-verification").get((req, res) => { console.log("email verification"); return res.send("email verification") });

// validate password reset token
router.route("/password-reset").get(validatePasswordResetToken);

// reset password
router.route("/password-reset").post(resetPassword);

// Refresh access token
router.route("/refresh-Token").post(refreshAccessToken);

// Logout user (secured route)
router.route("/logout").post(verifyJWT, logoutUser);

// Get current user (secured route), Update user details (secured route)
router.route("/current")
    .get(verifyJWT, getCurrentUser)
    .patch(verifyJWT, updateUserDetails)

// Change user password (secured route)
router.route("/password").patch(verifyJWT, UpdateUserPassword);

// Update user avatar (secured route)
router.route("/avatar").patch(verifyJWT,
    upload.single('avatar'), updateUserAvatar);

// Update user cover image (secured route)
router.route("/cover-image").patch(verifyJWT,
    upload.single('coverImage'), updateUserCoverImage);

// Get channel page by username (secured route)
router.route("/channel/:userName").get(verifyJWT, getUserChannelPage);

// Get watch history (secured route)
router.route("/watch-history").get(verifyJWT, getWatchHistory);


export default router;
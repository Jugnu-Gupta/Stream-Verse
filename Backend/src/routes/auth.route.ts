import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    validateUserEmail,
    validatePasswordResetToken,
    resetPassword,
} from "../controllers/auth.controller";

const router = Router();

// Register user
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser
);

// Login user
router.route("/login").post(loginUser);

// Verify email
router.route("/email-verification").get(validateUserEmail);

// Validate password reset token
router.route("/password-reset").get(validatePasswordResetToken);

// Reset password
router.route("/password-reset").post(resetPassword);

// Refresh access token
router.route("/refresh-token").post(refreshAccessToken);

// Logout user (secured route)
router.route("/logout").post(verifyJWT, logoutUser);

export default router;

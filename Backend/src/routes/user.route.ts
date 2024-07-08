import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    UpdateUserPassword,
    getCurrentUser,
    updateUserCoverImage,
    getUserChannelPage,
    updateUserDetails,
    updateUserAvatar,
    getWatchHistory,
} from "../controllers/user.controller";

const router = Router();

// Get current user (secured route), Update user details (secured route)
router
    .route("/current")
    .get(verifyJWT, getCurrentUser)
    .patch(verifyJWT, updateUserDetails);

// Change user password (secured route)
router.route("/password").patch(verifyJWT, UpdateUserPassword);

// Update user avatar (secured route)
router
    .route("/avatar")
    .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// Update user cover image (secured route)
router
    .route("/cover-image")
    .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// Get channel page by username (secured route)
router.route("/channel/:userName").get(verifyJWT, getUserChannelPage);

// Get watch history (secured route)
router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;

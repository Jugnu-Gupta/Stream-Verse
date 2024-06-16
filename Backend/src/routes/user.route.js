import { uploadImage } from "../middlewares/multer.middleware.js"
import {
    loginUser, logoutUser, registerUser, refreshAccessToken,
    changeUserPassword, getCurrentUser, updateUserCoverImage,
    getChannelPage, updateAccountDetails,
    updateUserAvatar, getWatchHistory
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/register").
    post(uploadImage.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), registerUser);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-Token").post(refreshAccessToken);
router.route("/change-password").post(changeUserPassword);

router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT,
    uploadImage.single('avatar'), updateUserAvatar);
router.route("/update-cover-image").patch(verifyJWT,
    uploadImage.single('coverImage'), updateUserCoverImage);

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/channel-profile/:userName").get(verifyJWT, getChannelPage);
router.route("/watch-history").get(verifyJWT, getWatchHistory);


export default router;
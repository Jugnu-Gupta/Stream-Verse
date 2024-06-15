import { uploadImage } from "../middlewares/multer.middleware.js"
import {
    loginUser, logoutUser, registerUser, refreshAccessToken,
    changeUserPassword, getCurrentUser
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
router.route("/current-user").get(verifyJWT, getCurrentUser);


export default router;
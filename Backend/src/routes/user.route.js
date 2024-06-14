import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { uploadImage } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").
    post(uploadImage.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), registerUser);



export default router;
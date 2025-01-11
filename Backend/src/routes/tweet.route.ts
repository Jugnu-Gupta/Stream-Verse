import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { Router } from "express";
import {
    createTweet,
    getUserTweet,
    updateTweet,
    getTweetById,
    deleteTweet,
} from "../controllers/tweet.controller";

const router = Router();

// Create a new tweet (secured route)
router.route("/").post(verifyJWT, upload.single("image"), createTweet);

// Update, delete tweet by id (secured route)
router
    .route("/:tweetId")
    .patch(verifyJWT, upload.single("image"), updateTweet)
    .delete(verifyJWT, deleteTweet);

// Get all tweets by user
router.route("/user/:userId/:curUserId?").get(getUserTweet);

// Get tweet details by id
router.route("/:tweetId/:userId?").get(getTweetById);

export default router;

import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { Router } from "express";
import {
    createTweet,
    getUserTweet,
    updateTweet,
    getTweetById,
    updateTweetImage,
    deleteTweet,
} from "../controllers/tweet.controller";

const router = Router();

// Create a new tweet (secured route)
router.route("/").post(verifyJWT, upload.single("image"), createTweet);

// Get all tweets by user
router.route("/user/:userId").get(getUserTweet);

// Update, delete tweet by id (secured route)
router
    .route("/:tweetId")
    .get(getTweetById)
    .patch(verifyJWT, updateTweet)
    .delete(verifyJWT, deleteTweet);

// Update tweet image by id (secured route)
router.route("/:tweetId/Image").patch(verifyJWT, updateTweetImage);

export default router;

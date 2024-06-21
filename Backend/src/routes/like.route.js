import {
    toggleVideoLike, toggleVideoDislike, toggleCommentLike,
    toggleCommentDislike, toggleTweetLike, toggleTweetDislike,
    getLikedVideos
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Like or dislike a video by id (secured route)
router.route('/video/:videoId').
    post(verifyJWT, toggleVideoLike)
    .post(verifyJWT, toggleVideoDislike);

// Like or dislike a comment by id (secured route)
router.route('/comment/:commentId')
    .post(verifyJWT, toggleCommentLike)
    .post(verifyJWT, toggleCommentDislike);

// Like or dislike a tweet by id (secured route)
router.route('/tweet/:tweetId')
    .post(verifyJWT, toggleTweetLike)
    .post(verifyJWT, toggleTweetDislike);

// Fetch all liked videos by user (secured route)
router.route('/video').get(verifyJWT, getLikedVideos);


export default router;
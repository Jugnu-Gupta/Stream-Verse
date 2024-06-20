import {
    likeVideoToggle, dislikeVideoToggle, likeCommentToggle,
    dislikeCommentToggle, likeTweetToggle, dislikeTweetToggle,
    likedVideosFetch
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


router.route('/video/:videoId').
    post(verifyJWT, likeVideoToggle)
    .post(verifyJWT, dislikeVideoToggle);

router.route('/comment/:commentId')
    .post(verifyJWT, likeCommentToggle)
    .post(verifyJWT, dislikeCommentToggle);

router.route('/tweet/:tweetId')
    .post(verifyJWT, likeTweetToggle)
    .post(verifyJWT, dislikeTweetToggle);

router.route('/video').get(verifyJWT, likedVideosFetch);


export default router;
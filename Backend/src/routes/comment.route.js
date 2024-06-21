import {
    getVideoComments, getTweetComments, createCommentInVideo,
    createCommentInTweet, updateComment, deleteComment
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// Fetch all comments of a video, add a comment to a video (secured route)
router.route('/video/:videoId')
    .get(getVideoComments)
    .post(verifyJWT, createCommentInVideo);

// Fetch all comments of a tweet, add a comment to a tweet (secured route)
router.route('/tweet/:tweetId')
    .get(getTweetComments)
    .post(verifyJWT, createCommentInTweet);

// Update, delete comment by id (secured route)
router.route('/:commentId').
    patch(verifyJWT, updateComment)
    .delete(verifyJWT, deleteComment);


export default router;
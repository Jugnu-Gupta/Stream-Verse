import {
    commentFetchVideo, CommentFetchTweet, commentAddInVideo,
    commentAddInTweet, commentUpdate, commentDelete
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


router.route('/video/:videoId')
    .get(commentFetchVideo)
    .post(verifyJWT, commentAddInVideo);

router.route('/tweet/:tweetId')
    .get(CommentFetchTweet)
    .post(verifyJWT, commentAddInTweet);

router.route('/:commentId').
    patch(verifyJWT, commentUpdate)
    .delete(verifyJWT, commentDelete);


export default router;
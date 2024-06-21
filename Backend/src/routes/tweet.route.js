import {
    createTweet, getUserTweet, updateTweet,
    updateTweetImage, deleteTweet
} from '../controllers/tweet.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { imageUploader } from '../middlewares/multer.middleware.js';
import { Router } from 'express';
const router = Router();


// Create a new tweet (secured route)
router.route('/')
    .post(verifyJWT, imageUploader.single('image'), createTweet);

// Get all tweets by user
router.route('/user/:userId')
    .get(getUserTweet);

// Update, delete tweet by id (secured route)
router.route('/:tweetId')
    .patch(verifyJWT, updateTweet)
    .delete(verifyJWT, deleteTweet);

// Update tweet image by id (secured route)
router.route('/:tweetId/Image')
    .patch(verifyJWT, updateTweetImage);


export default router;
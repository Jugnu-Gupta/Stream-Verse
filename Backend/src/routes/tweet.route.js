import {
    tweetPost, tweetFetchUser, tweetUpdate,
    tweetDelete, tweetImageUpdate
} from '../controllers/tweet.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { uploadImage } from '../middlewares/multer.middleware.js';
import { Router } from 'express';
const router = Router();

router.route('/')
    .post(verifyJWT, uploadImage.single('image'), tweetPost);

router.route('/:userId')
    .get(verifyJWT, tweetFetchUser);

router.route('/:tweetId')
    .patch(verifyJWT, tweetUpdate)
    .delete(verifyJWT, tweetDelete);

router.route('/:tweetId/Image')
    .patch(verifyJWT, tweetImageUpdate);

export default router;
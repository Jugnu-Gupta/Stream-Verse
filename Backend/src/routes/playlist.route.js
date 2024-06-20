import {
    playlistCreate, playlistFetchUser, playlistFetchById, playlistAddVideo,
    playlistRemoveVideo, playlistDelete, playlistUpdate
} from '../controllers/playlist.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


router.route('/').post(verifyJWT, playlistCreate);
router.route('/:userId').get(playlistFetchUser);
router.route('/:playlistId').get(playlistFetchById);

router.route('/:playlistId')
    .patch(verifyJWT, playlistUpdate)
    .delete(verifyJWT, playlistDelete);

router.route('/:playlistId/:videoId')
    .post(verifyJWT, playlistAddVideo)
    .delete(verifyJWT, playlistRemoveVideo);


export default router;
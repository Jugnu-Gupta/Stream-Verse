import {
    createPlaylist, getUserPlaylist, getPlaylistById, addVideoInPlaylist,
    deleteVideoFromPlaylist, deletePlaylist, updatePlaylist
} from '../controllers/playlist.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// Create a new playlist
router.route('/').post(verifyJWT, createPlaylist);

// Get all playlists by user
router.route('/:userId').get(getUserPlaylist);

// Get playlist by id (secured route)
router.route('/:playlistId').get(getPlaylistById);

// Update, delete playlist by id (secured route)
router.route('/:playlistId')
    .patch(verifyJWT, updatePlaylist)
    .delete(verifyJWT, deletePlaylist);

// Add, remove video to playlist by id (secured route)
router.route('/:playlistId/:videoId')
    .post(verifyJWT, addVideoInPlaylist)
    .delete(verifyJWT, deleteVideoFromPlaylist);


export default router;
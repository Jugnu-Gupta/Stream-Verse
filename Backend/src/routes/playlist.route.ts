import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    createPlaylist,
    getUserPlaylist,
    getPlaylistById,
    addVideoInPlaylist,
    deleteVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller";

const router = Router();

// Create a new playlist & get all playlists of a user
router.route("/").post(verifyJWT, createPlaylist).get(getUserPlaylist);

// Get playlist by id
router.route("/:playlistId").get(getPlaylistById);

// Update, delete playlist by id (secured route)
router
    .route("/:playlistId")
    .patch(verifyJWT, updatePlaylist)
    .delete(verifyJWT, deletePlaylist);

// Add, remove video to playlist by id (secured route)
router
    .route("/:playlistId/:videoId")
    .post(verifyJWT, addVideoInPlaylist)
    .delete(verifyJWT, deleteVideoFromPlaylist);

export default router;

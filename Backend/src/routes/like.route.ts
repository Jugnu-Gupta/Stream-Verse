import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    toggleLike,
    toggleDislike,
    getLikedVideos,
} from "../controllers/like.controller";

const router = Router();

// Like or dislike a tweet, video, comment by id (secured route)
router
    .route("/:entityType/:entityId")
    .post(verifyJWT, toggleLike)
    .post(verifyJWT, toggleDislike);

// Fetch all liked videos by user (secured route)
router.route("/video").get(verifyJWT, getLikedVideos);

export default router;

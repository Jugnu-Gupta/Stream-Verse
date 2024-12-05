import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    toggleLike,
    toggleDislike,
    getLikedVideos,
} from "../controllers/like.controller";

const router = Router();

// Like a tweet, video, comment by id (secured route)
router.route("/:entityType/:entityId/like").post(verifyJWT, toggleLike);

// dislike a tweet, video, comment by id (secured route)
router.route("/:entityType/:entityId/dislike").post(verifyJWT, toggleDislike);

// get all liked videos by user (secured route)
router.route("/video").get(verifyJWT, getLikedVideos);

export default router;

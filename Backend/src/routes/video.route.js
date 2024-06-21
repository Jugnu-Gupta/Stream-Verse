import {
    getAllVideo, uploadVideo, getVideoById,
    videoUpdate, deleteVideo, ToggleVideoPublishStatus
} from "../controllers/video.controller.js"
import { imageUploader, videoUploader } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


// Get all videos, upload video (secured routes)
router.route("/")
    .get(getAllVideo) // incomplete
    .post(verifyJWT, imageUploader.single('image'),
        videoUploader.single('video'), uploadVideo);

// Get, update, delete video by id (secured routes)
router.route("/:videoId")
    .get(getVideoById)
    .patch(verifyJWT, imageUploader.single('image'), videoUpdate)
    .delete(verifyJWT, deleteVideo);

// Toggle publish status of video (secured route)
router.route("/:videoId/publish").patch(verifyJWT, ToggleVideoPublishStatus);


export default router;




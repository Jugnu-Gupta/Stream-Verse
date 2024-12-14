import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    getAllVideo,
    uploadVideo,
    getVideoById,
    videoUpdate,
    deleteVideo,
    getVideosByIds,
    ToggleVideoPublishStatus,
} from "../controllers/video.controller";

const router = Router();

// Get all videos, upload video (secured routes)
router
    .route("/")
    .get(getAllVideo) // incomplete
    .post(
        verifyJWT,
        upload.fields([
            { name: "thumbnail", maxCount: 1 },
            { name: "video", maxCount: 1 },
        ]),
        uploadVideo
    );

router.route("/subscription").get(getVideosByIds);

// Get, update, delete video by id (secured routes)
router
    .route("/:videoId")
    .get(getVideoById)
    .patch(verifyJWT, upload.single("image"), videoUpdate)
    .delete(verifyJWT, deleteVideo);

// Toggle publish status of video (secured route)
router.route("/:videoId/publish").patch(verifyJWT, ToggleVideoPublishStatus);

export default router;

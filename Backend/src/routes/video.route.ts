import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";
import {
    addView,
    getAllVideo,
    uploadVideo,
    getVideoById,
    videoUpdate,
    deleteVideo,
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
            { name: "image", maxCount: 1 },
            { name: "video", maxCount: 1 },
        ]),
        uploadVideo
    );

// Get, update, delete video by id (secured routes)
router
    .route("/:videoId")
    .patch(verifyJWT, upload.single("image"), videoUpdate)
    .delete(verifyJWT, deleteVideo);

router.route("/:videoId/views").post(verifyJWT, addView);

router.route("/:videoId/:userId?").get(getVideoById);

// Toggle publish status of video (secured route)
router.route("/:videoId/publish").patch(verifyJWT, ToggleVideoPublishStatus);

export default router;

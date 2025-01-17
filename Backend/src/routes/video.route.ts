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
    streamVideo,
    ToggleVideoPublishStatus,
} from "../controllers/video.controller";

const router = Router();

// Get all videos, upload video (secured routes)
router
    .route("/")
    .get(getAllVideo)
    .post(
        verifyJWT,
        upload.fields([
            { name: "image", maxCount: 1 },
            { name: "video", maxCount: 1 },
        ]),
        uploadVideo
    );

// Stream video by publicId
router.route("/stream").get(streamVideo); // give publicId of video as query param

// Get, update, delete video by id (secured routes)
router
    .route("/:videoId")
    .patch(verifyJWT, upload.single("image"), videoUpdate)
    .delete(verifyJWT, deleteVideo);

router.route("/:videoId/views").post(verifyJWT, addView);

// Toggle publish status of video (secured route)
router.route("/:videoId/publish").patch(verifyJWT, ToggleVideoPublishStatus);

router.route("/:videoId/:userId?").get(getVideoById);

export default router;

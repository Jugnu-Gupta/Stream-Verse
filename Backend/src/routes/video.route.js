import {
    videoFetchAll, videoUpload, videoFetchById,
    videoUpdate, videoDelete, VideoTogglePublishStatus
} from "../controllers/video.controller.js"
import { uploadImage, uploadVideo } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();


router.route("/")
    .get(videoFetchAll) // incomplete
    .post(verifyJWT, uploadImage.single('image'),
        uploadVideo.single('video'), videoUpload);

router.route("/:videoId")
    .get(videoFetchById)
    .patch(verifyJWT, uploadImage.single('image'), videoUpdate)
    .delete(verifyJWT, videoDelete);

// secure all routes.
router.route("/:videoId/publish").patch(verifyJWT, VideoTogglePublishStatus);


export default router;




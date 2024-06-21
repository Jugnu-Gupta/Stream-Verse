import { getAdminChannelStats, getAdminChannelVideos }
    from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// Fetch channel stats (secured route)
router.route('/channel-stats').get(verifyJWT, getAdminChannelStats);

// Fetch channel videos (secured route)
router.route('/channel-videos').get(verifyJWT, getAdminChannelVideos);


export default router;
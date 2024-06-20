import { DashboardFetchChannelStats, DashboardFetchChannelVideos }
    from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


router.route('/channel-stats').get(verifyJWT, DashboardFetchChannelStats);
router.route('/channel-videos').get(verifyJWT, DashboardFetchChannelVideos);


export default router;
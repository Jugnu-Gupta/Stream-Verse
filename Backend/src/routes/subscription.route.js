import { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels }
    from '../controllers/subscription.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


// Toggle subscription to a channel by a user (secured route)
router.route('/toggle/:channelId').post(verifyJWT, toggleSubscription);

// Fetch all subscribers of a channel (secured route)
router.route('/user/:channelId').get(verifyJWT, getUserChannelSubscribers);

// Fetch all channels subscribed to by a user (secured route)
router.route('/channel/:subscriberId').get(verifyJWT, getSubscribedChannels);


export default router;
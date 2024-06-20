import { SubscriptionToggle, SubscriptionFetchUserChannelSubscribers, SubscriptionFetchSubscribedChannels }
    from '../controllers/subscription.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
const router = Router();


router.route('/toggle/:channelId').post(verifyJWT, SubscriptionToggle);
router.route('/user/:channelId').get(verifyJWT, SubscriptionFetchUserChannelSubscribers);
router.route('/channel/:subscriberId').get(verifyJWT, SubscriptionFetchSubscribedChannels);


export default router;
import mongoose, { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


// controller to toggle subscription
const SubscriptionToggle = asyncHandler(async (req, res) => {
    const { subscriberId } = req.user;
    const { channelId } = req.params;
    if (!subscriberId || !channelId) {
        const message = !subscriberId ? "Subscriber id is required" : "Channel id is required";
        throw new ApiError(400, message);
    }

    const subscription = await Subscription.findOneAndDelete({ subscriberId, channelId });
    if (!subscription) {
        const newSubscriber = await Subscription.create({ subscriberId, channelId });
        if (!newSubscriber) {
            throw new ApiError(400, "Failed to subscribe");
        }

        return res.status(201).json(
            new ApiResponse(201, newSubscriber, "Subscribed")
        );
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Unsubscribed")
    );
})


// controller to return subscriber list of a channel
const SubscriptionFetchUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel id is required");
    }

    const subscribers = await Subscription.find({ channelId });
    if (!subscribers?.length) {
        throw new ApiError(404, "No subscribers found");
    }

    return res.status(200).json(
        new ApiResponse(200, { subscribers }, "Channel subscribers")
    );
})


// controller to return channel list to which user has subscribed
const SubscriptionFetchSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Subscriber id is required");
    }

    const subscriptions = await Subscription.aggregate([
        { $match: { subscriberId: new mongoose.Types.ObjectId(subscriberId) } },
        {
            $lookup: {
                from: "User",
                localField: "channelId",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $lookup: {
                            from: "Subscription",
                            localField: "_id",
                            foreignField: "channelId",
                            as: "subscribers",
                            pipeline: [
                                { $project: { subscriberId: 1, _id: 0 } }
                            ]
                        },
                    },
                    {
                        $project: {
                            userName: 1,
                            avatar: 1,
                            fullName: 1,
                            totalSubscriber: { $size: "$subscribers" }
                        }
                    }
                ]
            }
        },
        { $project: { channel: { $arrayElemAt: ["$channel", 0] } } }
    ]);
    if (!subscriptions?.length) {
        throw new ApiError(404, "No subscriptions found");
    }

    return res.status(200).json(
        new ApiResponse(200, { subscriptions }, "Subscribed channels")
    );
})


export { SubscriptionToggle, SubscriptionFetchUserChannelSubscribers, SubscriptionFetchSubscribedChannels };
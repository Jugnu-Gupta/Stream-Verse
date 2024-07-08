import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { UserType } from "types/user.type";

interface RequestWithUser extends Request {
    user: UserType;
}
interface ToggleSubscriptionParams {
    channelId?: string;
}
const toggleSubscription = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { channelId }: ToggleSubscriptionParams = req.params;

        if (!channelId) {
            throw new ApiError(400, "Channel id is required");
        }

        const subscription = await Subscription.findOneAndDelete({
            subscriberId: req.user._id,
            channelId,
        });
        if (!subscription) {
            const newSubscriber = await Subscription.create({
                subscriberId: req.user._id,
                channelId,
            });
            if (!newSubscriber) {
                throw new ApiError(400, "Failed to subscribe");
            }

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        newSubscriber,
                        "Subscribed Successfully"
                    )
                );
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Unsubscribed Successfully"));
    }
);

interface GetUserChannelSubscribersParams {
    channelId?: string;
}
const getUserChannelSubscribers = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { channelId }: GetUserChannelSubscribersParams = req.params;
        if (!channelId) {
            throw new ApiError(400, "Channel id is required");
        }

        const subscribers = await Subscription.find({ channelId });
        if (!subscribers?.length) {
            throw new ApiError(404, "No subscribers found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { subscribers }, "Channel subscribers"));
    }
);

interface GetSubscribedChannelsParams {
    subscriberId?: string;
}
const getSubscribedChannels = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { subscriberId }: GetSubscribedChannelsParams = req.params;
        if (!isValidObjectId(subscriberId)) {
            throw new ApiError(400, "Subscriber id is required");
        }

        const subscriptions = await Subscription.aggregate([
            {
                $match: {
                    subscriberId: new mongoose.Types.ObjectId(subscriberId),
                },
            },
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
                                    { $project: { subscriberId: 1, _id: 0 } },
                                ],
                            },
                        },
                        {
                            $project: {
                                userName: 1,
                                avatar: 1,
                                fullName: 1,
                                totalSubscriber: { $size: "$subscribers" },
                            },
                        },
                    ],
                },
            },
            { $project: { channel: { $arrayElemAt: ["$channel", 0] } } },
        ]);
        if (!subscriptions?.length) {
            throw new ApiError(404, "No subscriptions found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, { subscriptions }, "Subscribed channels")
            );
    }
);

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };

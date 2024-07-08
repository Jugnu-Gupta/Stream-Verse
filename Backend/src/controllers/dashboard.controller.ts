import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { Video } from "../models/video.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import mongoose, { isValidObjectId } from "mongoose";
import { UserType } from "../types/user.type";

interface RequestWithUser extends Request {
    user: UserType;
}

// controller to Get the channel stats like total video views, total subscribers, total videos, total likes etc.
const getAdminChannelStats = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        // check if the user id is valid.
        if (!isValidObjectId(req?.user?._id)) {
            throw new ApiError(400, "Invalid user id");
        }
        const userId = new mongoose.Types.ObjectId(req?.user?._id);

        const user = await User.aggregate([
            { $match: { _id: userId } },
            {
                $lookup: {
                    from: "Subscription",
                    localField: "_id",
                    foreignField: "channelId",
                    as: "Subscribers",
                },
            },
            {
                $lookup: {
                    from: "Video",
                    localField: "_id",
                    foreignField: "ownerId",
                    as: "Videos",
                    pipeline: [
                        {
                            $lookup: {
                                from: "Like",
                                localField: "_id",
                                foreignField: "videoId",
                                as: "Likes",
                            },
                        },
                        {
                            $addFields: {
                                likes: {
                                    $size: {
                                        $filter: {
                                            input: "$Likes",
                                            as: "Like",
                                            cond: {
                                                $eq: ["$$Like.isLiked", true],
                                            },
                                        },
                                    },
                                },
                                dislikes: {
                                    $size: {
                                        $filter: {
                                            input: "$Likes",
                                            as: "Like",
                                            cond: {
                                                $eq: ["$$Like.isLiked", false],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        { $project: { likes: 1, dislikes: 1, views: 1 } },
                    ],
                },
            },
            {
                $addFields: {
                    totalSubscribers: { $size: "$Subscribers" },
                    totalVideos: { $size: "$Videos" },
                    totalViews: { $sum: "$Videos.views" },
                    totalLikes: { $sum: "$Videos.likes" },
                    totalDislikes: { $sum: "$Videos.dislikes" },
                },
            },
            {
                $project: {
                    totalSubscribers: 1,
                    totalVideos: 1,
                    totalViews: 1,
                    totalLikes: 1,
                    totalDislikes: 1,
                },
            },
        ]);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { user },
                    "Channel stats fetched successfully"
                )
            );
    }
);

// controller to Get all the videos uploaded by the channel
const getAdminChannelVideos = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        // check if the user id is valid.
        if (!isValidObjectId(req?.user?._id)) {
            throw new ApiError(400, "Invalid user id");
        }
        const userId = new mongoose.Types.ObjectId(req?.user?._id);

        const videos = await Video.aggregate([
            { $match: { ownerId: userId } },
            {
                $lookup: {
                    from: "Like",
                    localField: "_id",
                    foreignField: "videoId",
                    as: "Likes",
                },
            },
            {
                $addFields: {
                    likes: {
                        $size: {
                            $filter: {
                                input: "$Likes",
                                as: "Like",
                                cond: { $eq: ["$$Like.isLiked", true] },
                            },
                        },
                    },
                    dislikes: {
                        $size: {
                            $filter: {
                                input: "$Likes",
                                as: "Like",
                                cond: { $eq: ["$$Like.isLiked", false] },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    isPublished: 1,
                    thumbnail: 1,
                    likes: 1,
                    dislikes: 1,
                    views: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        if (!videos?.length) {
            throw new ApiError(404, "No videos found for this channel");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, { videos }, "Videos fetched successfully")
            );
    }
);

export { getAdminChannelStats, getAdminChannelVideos };

import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose, { isValidObjectId } from "mongoose";

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

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
            }
        },
        { addFields: { totalSubscribers: { $size: "$Subscribers" } } },
        { $project: { subscribers: 1 } }
    ]);

    return res.status(200).json(
        new ApiResponse(200, { user }, "Channel stats fetched successfully")
    );
})


const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

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
                as: "likes",
            }
        },
        {
            addFields: {
                totalLikes: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$Likes.isLiked", true] },
                            then: 1, else: 0
                        }
                    }
                },
                totalDislikes: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$Likes.isLiked", false] },
                            then: 1, else: 0
                        }
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                isPublished: 1,
                thumbnail: 1,
                totalLikes: 1,
                totalDislikes: 1,
                views: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ]);

    if (!videos?.length) {
        throw new ApiError(404, "No videos found for this channel")
    }
    return res.status(200).json(
        new ApiResponse(200, { videos }, "Videos fetched successfully")
    );
})

export {
    getChannelStats,
    getChannelVideos
}
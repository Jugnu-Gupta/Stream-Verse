import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { UserType } from "types/user.type";

interface RequestWithUser extends Request {
    user: UserType;
}

interface ToggleLikeParams {
    entityId?: string;
    entityType?: string;
}

const toggleLike = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const { entityId, entityType }: ToggleLikeParams = req.params;
    if (!entityId) {
        throw new ApiError(400, "Video id is required");
    }
    if (["Comment", "Video", "Tweet"].includes(entityType)) {
        throw new ApiError(400, "Invalid entity type");
    }

    const like = await Like.findOne({
        entityId,
        entityType,
        likedBy: req.user._id,
    });
    if (!like) {
        const newLike = await Like.create({
            entityId,
            entityType,
            likedBy: req.user._id,
            isLiked: true,
        });
        if (!newLike) {
            throw new ApiError(400, "Failed to like video");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { like: newLike }, "Video liked"));
    } else if (like.isLiked) {
        const removelike = await Like.findByIdAndDelete(like._id);
        if (!removelike) {
            throw new ApiError(400, "Failed to unlike video");
        }

        return res.status(200).json(new ApiResponse(200, null, "Like removed"));
    } else {
        like.isLiked = true;
        await like.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, { like }, "Video liked"));
    }
});

interface ToggleDislikeParams {
    entityId?: string;
    entityType?: string;
}

const toggleDislike = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { entityId, entityType }: ToggleDislikeParams = req.params;
        if (!entityId) {
            throw new ApiError(400, "Video id is required");
        }
        if (["Comment", "Video", "Tweet"].indexOf(entityType) === -1) {
            throw new ApiError(400, "Invalid entity type");
        }

        const dislike = await Like.findOne({
            entityId,
            entityType,
            likedBy: req.user._id,
        });
        if (!dislike) {
            const newDislike = await Like.create({
                entityId,
                entityType,
                likedBy: req.user._id,
                isLiked: false,
            });
            if (!newDislike) {
                throw new ApiError(400, "Failed to dislike video");
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { dislike: newDislike },
                        "Video disliked"
                    )
                );
        } else if (!dislike.isLiked) {
            const removeDislike = await Like.findByIdAndDelete(dislike._id);
            if (!removeDislike) {
                throw new ApiError(400, "Failed to unlike video");
            }

            return res
                .status(200)
                .json(new ApiResponse(200, null, "Dislike removed"));
        } else {
            dislike.isLiked = false;
            await dislike.save({ validateBeforeSave: false });

            return res
                .status(200)
                .json(new ApiResponse(200, { dislike }, "Video liked"));
        }
    }
);

const getLikedVideos = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        if (!isValidObjectId(req.user._id)) {
            throw new ApiError(400, "Invalid user id");
        }
        const userId = new mongoose.Types.ObjectId(req.user._id);

        const likedVideos = await Like.aggregate([
            {
                $match: {
                    likedBy: userId,
                    entityType: "Video",
                },
            },
            {
                $lookup: {
                    from: "Video",
                    localField: "videoId",
                    foreignField: "_id",
                    as: "video",
                    pipeline: [
                        {
                            $lookup: {
                                from: "User",
                                localField: "ownerId",
                                foreignField: "_id",
                                as: "owner",
                                pipeline: [
                                    {
                                        $project: {
                                            fullName: 1,
                                            userName: 1,
                                            avatar: 1,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            $addFields: {
                                owner: { $arrayElemAt: ["$owner", 0] },
                            },
                        },
                    ],
                },
            },
            { $addFields: { video: { $arrayElemAt: ["$video", 0] } } },
            { $sort: { createdAt: -1 } },
            { $project: { video: 1 } },
        ]);

        if (!likedVideos?.length) {
            throw new ApiError(404, "No liked videos found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { likedVideos }, "Liked videos"));
    }
);

export { toggleLike, toggleDislike, getLikedVideos };

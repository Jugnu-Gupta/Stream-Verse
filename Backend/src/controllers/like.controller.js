import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


// controller to toggle like on video
const likeVideoToggle = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video id is required");
    }

    const like = await Like.findOne({ videoId, likedBy: req.user._id }).
        select("-commentId -tweetId");
    if (!like) {
        const newLike = await Like.create({
            videoId,
            likedBy: req.user._id,
            isLiked: true
        });
        if (!newLike) {
            throw new ApiError(400, "Failed to like video");
        }

        return res.status(200).json(
            new ApiResponse(200, { newLike }, "Video liked")
        );
    }
    else if (like.isLiked) {
        const removelike = await Like.findByIdAndDelete(like._id);
        if (!removelike) {
            throw new ApiError(400, "Failed to unlike video");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Like removed")
        );
    }
    else {
        like.isLiked = true;
        await like.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { like }, "Video liked")
        );
    }
})


// controller to toggle dislike on video
const dislikeVideoToggle = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video id is required");
    }

    const dislike = await Like.findOne({ videoId, likedBy: req.user._id }).
        select("-commentId -tweetId");
    if (!dislike) {
        const newDislike = await Like.create({
            videoId,
            likedBy: req.user._id,
            isLiked: false
        });
        if (!newDislike) {
            throw new ApiError(400, "Failed to dislike video");
        }

        return res.status(200).json(
            new ApiResponse(200, { newDislike }, "Video disliked")
        );
    }
    else if (!dislike.isLiked) {
        const removeDislike = await Like.findByIdAndDelete(dislike._id);
        if (!removeDislike) {
            throw new ApiError(400, "Failed to unlike video");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Dislike removed")
        );
    }
    else {
        dislike.isLiked = false;
        await dislike.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { dislike }, "Video liked")
        );
    }
})


// controller to toggle like on comment
const likeCommentToggle = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        throw new ApiError(400, "comment id is required");
    }

    const like = await Like.findOne({ commentId, likedBy: req.user._id }).
        select("-videoId -tweetId");
    if (!like) {
        const newLike = await Like.create({
            commentId,
            likedBy: req.user._id,
            isLiked: true
        });
        if (!newLike) {
            throw new ApiError(400, "Failed to like comment");
        }

        return res.status(200).json(
            new ApiResponse(200, { newLike }, "Comment liked")
        );
    }
    else if (like.isLiked) {
        const removelike = await Like.findByIdAndDelete(like._id);
        if (!removelike) {
            throw new ApiError(400, "Failed to unlike comment");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Like removed from video")
        );
    }
    else {
        like.isLiked = true;
        await like.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { like }, "Video liked")
        );
    }
})


// controller to toggle dislike on comment
const dislikeCommentToggle = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        throw new ApiError(400, "comment id is required");
    }

    const dislike = await Like.findOne({ commentId, likedBy: req.user._id }).
        select("-videoId -tweetId");
    if (!commentId) {
        const newDislike = await Like.create({
            commentId,
            likedBy: req.user._id,
            isLiked: false
        });
        if (!newDislike) {
            throw new ApiError(400, "Failed to dislike comment");
        }

        return res.status(200).json(
            new ApiResponse(200, { newDislike }, "Comment disliked")
        );
    }
    else if (!dislike.isLiked) {
        const removeDislike = await Like.findByIdAndDelete(dislike._id);
        if (!removeDislike) {
            throw new ApiError(400, "Failed to unlike comment");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Dislike removed from comment")
        );
    }
    else {
        dislike.isLiked = false;
        await dislike.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { dislike }, "Comment liked")
        );
    }
});


// controller to toggle like on tweet
const likeTweetToggle = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId) {
        throw new ApiError(400, "tweet id is required");
    }

    const like = await Like.findOne({ tweetId, likedBy: req.user?._id }).
        select("-videoId -commentId");
    if (!like) {
        const newLike = await Like.create({
            tweetId,
            likedBy: req.user._id,
            isLiked: true
        });
        if (!newLike) {
            throw new ApiError(400, "Failed to like tweet");
        }

        return res.status(200).json(
            new ApiResponse(200, { newLike }, "Tweet liked")
        );
    }
    else if (like.isLiked) {
        const removelike = await Like.findByIdAndDelete(like._id);
        if (!removelike) {
            throw new ApiError(400, "Failed to unlike tweet");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Like removed from tweet")
        );
    }
    else {
        like.isLiked = true;
        await like.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { like }, "tweet liked")
        );
    }
})


// controller to toggle like on tweet
const dislikeTweetToggle = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!tweetId) {
        throw new ApiError(400, "tweet id is required");
    }

    const dislike = await Like.findOne({ tweetId, likedBy: req.user._id }).
        select("-videoId -commentId");
    if (!tweetId) {
        const newDislike = await Like.create({
            tweetId,
            likedBy: req.user._id,
            isLiked: false
        });
        if (!newDislike) {
            throw new ApiError(400, "Failed to dislike tweet");
        }

        return res.status(200).json(
            new ApiResponse(200, { newDislike }, "Tweet disliked")
        );
    }
    else if (!dislike.isLiked) {
        const removeDislike = await Like.findByIdAndDelete(dislike._id);
        if (!removeDislike) {
            throw new ApiError(400, "Failed to unlike tweet");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Dislike removed from tweet")
        );
    }
    else {
        dislike.isLiked = false;
        await dislike.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, { dislike }, "Tweet liked")
        );
    }
});


// controller to fetch all liked videos
const likedVideosFetch = asyncHandler(async (req, res) => {
    if (!isValidObjectId(req.user?._id)) {
        throw new ApiError(400, "Invalid user id");
    }
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const likedVideos = await Like.aggregate([
        { $match: { likedBy: userId, videoId: { $exists: true } } },
        {
            lookup: {
                from: "Video",
                localField: "videoId",
                foriegnField: "_id",
                as: "video",
                pipeline: [
                    {
                        lookup: {
                            from: "User",
                            localField: "ownerId",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [{
                                $project: {
                                    fullName: 1,
                                    userName: 1,
                                    avatar: 1
                                }
                            }]
                        }
                    },
                    { $addFields: { owner: { $arrayElemAt: ["$owner", 0] } } }
                ]
            },
        },
        { $addFields: { video: { $arrayElemAt: ["$video", 0] } } },
        { $sort: { createdAt: -1 } },
        { $project: { video: 1 } }
    ]);

    if (!likedVideos?.length) {
        throw new ApiError(404, "No liked videos found");
    }

    return res.status(200).json(
        new ApiResponse(200, { likedVideos }, "Liked videos")
    );
})


export {
    likeVideoToggle, dislikeVideoToggle, likeCommentToggle,
    dislikeCommentToggle, likeTweetToggle, dislikeTweetToggle,
    likedVideosFetch
}
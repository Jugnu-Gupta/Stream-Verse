import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


// controller to get all comments for a video
const commentFetchVideo = asyncHandler(async (req, res) => {
    const { videoId, parentId = null } = req.params;
    const { page = 1, limit = 10 } = req.query;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Video id is required")
    }

    // Convert page and limit to integers
    const pageNo = parseInt(page, 10);
    const limitNo = parseInt(limit, 10);
    const skip = (pageNo - 1) * limitNo;

    const comments = await Comment.aggregate([
        { $match: { videoId: new mongoose.Types.ObjectId(videoId), parentId } },
        {
            $lookup: {
                from: "User",
                localField: "userId",
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
        {
            $lookup: {
                from: "Comment",
                localField: "_id",
                foreignField: "parentId",
                as: "replies",
            }
        },
        {
            $lookup: {
                from: "Like",
                localField: "_id",
                foreignField: "commentId",
                as: "Likes"
            }
        },
        {
            $addFields: {
                owner: { $arrayElemAt: ["$owner", 0] },
                replies: { $size: "$replies" },
                likes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", true] }
                        }
                    }
                },
                likes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", false] }
                        }
                    }
                }
            }
        },
        { $sort: { createdAt: -1 } },
        {
            $project: {
                owner: 1,
                content: 1,
                likes: 1,
                dislikes: 1,
                replies: 1,
                createdAt: 1,
                updatedAt: 1
            }
        },
        { $skip: skip },
        { $limit: limitNo },
    ]);
    if (!comments?.length) {
        throw new ApiError(404, "No comments found")
    }

    return res.status(200).json(
        new ApiResponse(200, { comments }, "Comments found")
    );
})


// controller to get all comments for a tweet
const CommentFetchTweet = asyncHandler(async (req, res) => {
    const { tweetId, parentId = null } = req.params;
    const { page = 1, limit = 10 } = req.query;
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Video id is required")
    }

    // Convert page and limit to integers
    const pageNo = parseInt(page, 10);
    const limitNo = parseInt(limit, 10);
    const skip = (pageNo - 1) * limitNo;

    const comments = await Comment.aggregate([
        { $match: { tweetId: new mongoose.Types.ObjectId(tweetId), parentId } },
        {
            $lookup: {
                from: "User",
                localField: "userId",
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
        {
            $lookup: {
                from: "Comment",
                localField: "_id",
                foreignField: "parentId",
                as: "replies",
            }
        },
        {
            $lookup: {
                from: "Like",
                localField: "_id",
                foreignField: "commentId",
                as: "Likes"
            }
        },
        {
            $addFields: {
                owner: { $arrayElemAt: ["$owner", 0] },
                replies: { $size: "$replies" },
                likes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", true] }
                        }
                    }
                },
                likes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", false] }
                        }
                    }
                }
            }
        },
        { $sort: { createdAt: -1 } },
        {
            $project: {
                owner: 1,
                content: 1,
                likes: 1,
                dislikes: 1,
                replies: 1,
                createdAt: 1,
                updatedAt: 1
            }
        },
        { $skip: skip },
        { $limit: limitNo },
    ]);
    if (!comments?.length) {
        throw new ApiError(404, "No comments found")
    }

    return res.status(200).json(
        new ApiResponse(200, { comments }, "Comments found")
    );
});


// controller to add a comment to a video
const commentAddInVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content, parentId } = req.body;

    if (!content || !videoId) {
        const message = !content ? "Content is required" : "Video id is required";
        throw new ApiError(400, message);
    }

    const comment = await Comment.create({
        videoId,
        content,
        parentId: parentId ? parentId : null,
    });

    if (!comment) {
        throw new ApiError(500, "Failed to add comment");
    }

    return res.status(201).json(
        new ApiResponse(201, comment, "Comment added successfully")
    );
})


// controller to add a comment to a video
const commentAddInTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content, parentId } = req.body;

    if (!content || !videoId) {
        const message = !content ? "Content is required" : "tweet id is required";
        throw new ApiError(400, message);
    }

    const comment = await Comment.create({
        tweetId,
        content,
        parentId: parentId ? parentId : null,
    });

    if (!comment) {
        throw new ApiError(500, "Failed to add comment");
    }

    return res.status(201).json(
        new ApiResponse(201, comment, "Comment added successfully")
    );
})


// controller to update a comment
const commentUpdate = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if (!commentId || !content) {
        const message = !commentId ? "Comment id is required" : "Content is required";
        throw new ApiError(400, message);
    }

    const comment = await Comment.findByIdAndUpdate(commentId, { $set: { content } }, { new: true });
    if (!comment) {
        throw new ApiError(500, "Failed to update comment");
    }

    return res.status(200).json(
        new ApiResponse(200, comment, "Comment updated successfully")
    );
})


// Recursive function to find all replies of a comment
const findRepliesRec = async (commentId) => {
    const replies = await Comment.find({ parentId: commentId });
    let result = [];
    for (let i = 0; i < replies.length; i++) {
        const reply = replies[i];
        const subReplies = await findReplies(reply._id);

        result.push(reply._id);
        result.concat(subReplies);
    }
    return result;
};


// controller to delete a comment
const commentDelete = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "Comment id is required");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Extract all replies/comments to be deleted.
    const commentIds = (await findRepliesRec(commentId)).push(commentId);

    // delete comment, allReplies, and its likes
    const delComment = await Comment.deleteMany({ _id: { $in: commentIds } });
    const delLikes = await Like.deleteMany({ commentId: { $in: commentIds } });
    if (!delComment?.acknowledged) {
        throw new ApiError(500, "Failed to delete comment");
    }
    if (!delLikes?.acknowledged) {
        throw new ApiError(500, "Failed to delete comment likes");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );
})


export {
    commentFetchVideo, CommentFetchTweet, commentAddInVideo,
    commentAddInTweet, commentUpdate, commentDelete
}
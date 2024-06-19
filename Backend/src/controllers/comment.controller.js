import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
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
        { $sort: { createdAt: -1 } },
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


const getTweetComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a tweet
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
        { $sort: { createdAt: -1 } },
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


const addCommentInVideo = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

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


const addCommentInTweet = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

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


const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

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

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "Comment id is required");
    }

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );
})

export {
    getVideoComments, getTweetComments, addCommentInTweet,
    addCommentInVideo, updateComment, deleteComment
}
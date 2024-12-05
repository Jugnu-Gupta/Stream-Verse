import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { CommentType } from "../types/comment.type";
import mongoose from "mongoose";

interface CommentTypeDoc extends CommentType, mongoose.Document {}

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
        tweetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    },
    { timestamps: true }
);

// Add custom validation to ensure either tweetId or videoId is provided
commentSchema.pre("validate", function (next) {
    if (!this.videoId && !this.tweetId) {
        return next(new Error("Either videoId or tweetId must be provided."));
    }
    next();
});

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model<CommentTypeDoc>("Comment", commentSchema);

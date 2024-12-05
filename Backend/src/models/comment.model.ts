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

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model<CommentTypeDoc>("Comment", commentSchema);

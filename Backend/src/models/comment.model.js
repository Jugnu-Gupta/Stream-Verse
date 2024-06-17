import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        tweetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet"
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    },
    { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);
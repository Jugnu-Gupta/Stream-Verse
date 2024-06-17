import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            unique: true,
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            unique: true,
        },
        tweetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
            unique: true,
        },
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true,
        },
        isLiked: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
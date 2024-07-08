import mongoose from "mongoose";

interface LikeType {
    commentId?: mongoose.Schema.Types.ObjectId;
    videoId?: mongoose.Schema.Types.ObjectId;
    tweetId?: mongoose.Schema.Types.ObjectId;
    likedBy: mongoose.Schema.Types.ObjectId;
    isLiked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { LikeType };

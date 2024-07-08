import mongoose from "mongoose";

interface CommentType {
    content: string;
    ownerId: mongoose.Schema.Types.ObjectId;
    videoId?: mongoose.Schema.Types.ObjectId;
    tweetId?: mongoose.Schema.Types.ObjectId;
    parentId?: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type { CommentType };

import mongoose from "mongoose";

interface LikeType {
    entityId: mongoose.Schema.Types.ObjectId;
    entityType: string;
    likedBy: mongoose.Schema.Types.ObjectId;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type { LikeType };

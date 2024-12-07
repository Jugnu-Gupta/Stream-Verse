import { LikeType } from "../types/like.type";
import mongoose from "mongoose";

interface LikeTypeDoc extends mongoose.Document, LikeType {}

const likeSchema = new mongoose.Schema(
    {
        // Reference to the associated entity (Comment, Video, or Tweet)
        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        entityType: {
            type: String,
            enum: ["comment", "video", "tweet"],
            required: true,
        },
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isLiked: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

// Create a compound index to ensure uniqueness for likedBy + entityId + entityType
likeSchema.index({ likedBy: 1, entityId: 1, entityType: 1 }, { unique: true });

export const Like = mongoose.model<LikeTypeDoc>("Like", likeSchema);

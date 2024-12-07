import mongoose from "mongoose";

interface CommentType {
    content: string;
    ownerId: mongoose.Schema.Types.ObjectId;
    entityId: mongoose.Schema.Types.ObjectId;
    entityType: string;
    parentId?: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type { CommentType };

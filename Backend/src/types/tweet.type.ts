import mongoose from "mongoose";

interface TweetType {
    ownerId: mongoose.Schema.Types.ObjectId;
    content: string;
    image?: {
        publicId: string;
        url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export type { TweetType };

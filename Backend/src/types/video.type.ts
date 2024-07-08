import mongoose from "mongoose";

interface VideoType {
    videoFile: {
        publicId: string;
        url: string;
    };
    thumbnail: {
        publicId: string;
        url: string;
    };
    ownerId: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    duration: number;
    views: number;
    quality?: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type { VideoType };

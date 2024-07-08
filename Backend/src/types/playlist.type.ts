import mongoose from "mongoose";

interface PlaylistType {
    name: string;
    description: string;
    ownerId: mongoose.Schema.Types.ObjectId;
    videos: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export type { PlaylistType };

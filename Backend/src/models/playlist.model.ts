import { PlaylistType } from "../types/playlist.type";
import mongoose from "mongoose";

interface PlaylistTypeDoc extends mongoose.Document, PlaylistType {}

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
    },
    { timestamps: true }
);

export const Playlist = mongoose.model<PlaylistTypeDoc>(
    "Playlist",
    playlistSchema
);

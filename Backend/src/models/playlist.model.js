import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        videoList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
                unique: true,
                required: true
            }
        ],
    },
    { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
import { TweetType } from "../types/tweet.type";
import mongoose from "mongoose";

interface TweetTypeDoc extends mongoose.Document, TweetType {}

const tweetSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: {
                publicId: String,
                url: String,
            },
            _id: false,
        },
    },
    { timestamps: true }
);

export const Tweet = mongoose.model<TweetTypeDoc>("Tweet", tweetSchema);

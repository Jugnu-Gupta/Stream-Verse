import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
        content: {
            type: String,
            required: true
        },
        ImageId: {
            type: {
                publicId: String,
                url: String
            },
            _id: false,
        }
    },
    { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
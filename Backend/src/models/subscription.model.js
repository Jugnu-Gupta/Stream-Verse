import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
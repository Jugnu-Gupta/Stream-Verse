import { SubscriptionType } from "../types/subscription.type";
import mongoose from "mongoose";

interface SubscriptionTypeDoc extends mongoose.Document, SubscriptionType {}

const subscriptionSchema = new mongoose.Schema(
    {
        subscriberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Subscription = mongoose.model<SubscriptionTypeDoc>(
    "Subscription",
    subscriptionSchema
);

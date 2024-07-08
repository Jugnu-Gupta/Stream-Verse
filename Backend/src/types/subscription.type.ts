import mongoose from "mongoose";

interface SubscriptionType {
    subscriberId: mongoose.Schema.Types.ObjectId;
    channelId: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type { SubscriptionType };

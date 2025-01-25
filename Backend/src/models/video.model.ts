import mongoose, { Schema, model } from "mongoose";
import { VideoType } from "../types/video.type";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

interface VideoTypeDoc extends VideoType, mongoose.Document {}

const videoSchema = new Schema(
    {
        videoFile: {
            type: {
                publicId: String,
                url: String,
            },
            _id: false,
            required: true,
        },
        thumbnail: {
            type: {
                publicId: String,
                url: String,
            },
            _id: false,
            required: true,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            index: "text",
            required: true,
        },
        description: {
            type: String,
            index: "text",
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        quality: {
            type: String,
            default: "720p",
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model<VideoTypeDoc>("Video", videoSchema);

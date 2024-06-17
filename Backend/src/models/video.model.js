import mongoose, { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
    videoFile: {
        // cloudinary: publicId and url
        type: {
            publicId: String,
            url: String
        },
        _id: false,
        required: true,
    },
    thumbnail: {
        // cloudinary: publicId and url
        type: {
            publicId: String,
            url: String
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
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
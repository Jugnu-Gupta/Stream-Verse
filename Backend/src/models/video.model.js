import mongoose, { Aggregate, Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videosSchema = new Schema({
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
    owner: {
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

videosSchema.plugin(mongooseAggregatePaginate);

export const Videos = model("Videos", videosSchema);
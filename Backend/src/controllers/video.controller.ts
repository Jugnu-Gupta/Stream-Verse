import { Request, Response } from "express";
import mongoose, { isValidObjectId, Mongoose } from "mongoose";
import { Video } from "../models/video.model";
import { Like } from "../models/like.model";
import { Comment } from "../models/comment.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { UserType } from "types/user.type";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary";
import { getVideoQuality } from "../utils/getVideoQuality";

interface RequestWithUser extends Request {
    user: UserType;
}

interface GetAllVideoQuery {
    page?: number;
    limit?: number;
    query?: string;
    sortBy?: string;
    duration?: number;
    userId?: string;
}

// controller to fetch all videos based on query, sort, pagination
const getAllVideo = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const {
            page = 1,
            limit = 10,
            query,
            // sortBy,
            // duration,
            // userId,
        }: GetAllVideoQuery = req.query;

        if (!query) {
            throw new ApiError(400, "Query is required");
        }

        const skip = (page - 1) * limit;
        // if (userId) {
        //     if (!isValidObjectId(userId))
        //         filter.ownerId = new mongoose.Types.ObjectId(userId);
        //     else throw new ApiError(400, "Invalid user id");
        // }

        const sortCritieria = {}; // define

        const videos = await Video.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query,
                        path: ["title", "description"],
                    },
                },
            },
            {
                $limit: 10,
            },
            { $match: { isPublished: true } },
            {
                $lookup: {
                    from: "users",
                    localField: "ownerId",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                fullName: 1,
                                userName: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $addFields: {
                    owner: { $arrayElemAt: ["$owner", 0] },
                    score: { $meta: "searchScore" },
                },
            },
            {
                $sort: { score: -1 }, // descending order
            },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    title: 1,
                    description: 1,
                    thumbnail: 1,
                    owner: 1,
                    duration: 1,
                    views: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        if (!videos) {
            throw new ApiError(404, "No videos found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, { videos }, "Videos fetched successfully")
            );
    }
);

interface UploadVideoBody {
    title?: string;
    description?: string;
}
interface UploadedFile {
    path: string;
}
interface CustomFiles {
    image?: UploadedFile[];
    video?: UploadedFile[];
}
interface FileType {
    files?: CustomFiles;
}

const uploadVideo = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { title, description }: UploadVideoBody = req.body;
        if (!title || !description) {
            const message = !title
                ? "Title is required"
                : "Description is required";
            throw new ApiError(400, message);
        }

        const thumbnailLocalPath = (req as FileType).files?.image?.[0]?.path;
        const videoLocalPath = (req as FileType).files?.video?.[0]?.path;
        if (!videoLocalPath || !thumbnailLocalPath) {
            const message = !videoLocalPath
                ? "Video is required"
                : "Thumbnail is required";
            throw new ApiError(400, message);
        }

        const videoFile = await uploadOnCloudinary(videoLocalPath, "video");
        const videoQuality = getVideoQuality(videoFile.width, videoFile.height);
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "image");
        if (!videoFile?.secure_url || !thumbnail?.secure_url) {
            const message = !videoFile
                ? "Failed to upload video"
                : "Failed to upload thumbnail";
            throw new ApiError(500, message);
        }

        const video = await Video.create({
            videoFile: {
                publicId: videoFile?.public_id,
                url: videoFile?.secure_url || "",
            },
            thumbnail: {
                publicId: thumbnail?.public_id,
                url: thumbnail?.secure_url || "",
            },
            quality: videoQuality,
            title,
            description,
            duration: videoFile?.duration,
            ownerId: req.user?._id,
        });

        // check if video is created
        const uploadedVideo = await Video.findById(video?._id);
        if (!uploadedVideo) {
            throw new ApiError(500, "Failed to upload video");
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                // uploadedVideo,
                "Video uploaded successfully"
            )
        );
    }
);

interface GetVideoByIdParams {
    videoId: string;
    userId?: string;
}

const getVideoById = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        let { videoId, userId } = req.params as unknown as GetVideoByIdParams;
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid video id");
        }
        if (!isValidObjectId(userId)) {
            userId = null;
        }

        // get video details like likes, dislikes
        const video = await Video.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
            {
                $lookup: {
                    from: "likes",
                    let: { videoId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$videoId"],
                                        },
                                        {
                                            $eq: ["$entityType", "video"],
                                        },
                                    ],
                                },
                            },
                        },
                        { $project: { _id: 1, isLiked: 1, likedBy: 1 } },
                    ],
                    as: "videoLikes",
                },
            },
            {
                $addFields: {
                    likeStatus: {
                        $cond: {
                            if: {
                                $in: [
                                    new mongoose.Types.ObjectId(userId),
                                    "$videoLikes.likedBy",
                                ],
                            },
                            then: {
                                $cond: {
                                    if: {
                                        $arrayElemAt: [
                                            "$videoLikes.isLiked",
                                            {
                                                $indexOfArray: [
                                                    "$videoLikes.likedBy",
                                                    new mongoose.Types.ObjectId(
                                                        userId
                                                    ),
                                                ],
                                            },
                                        ],
                                    },
                                    then: 1,
                                    else: -1,
                                },
                            },
                            else: 0,
                        },
                    },
                    likes: {
                        $size: {
                            $filter: {
                                input: "$videoLikes",
                                as: "like",
                                cond: { $eq: ["$$like.isLiked", true] },
                            },
                        },
                    },
                    dislikes: {
                        $size: {
                            $filter: {
                                input: "$videoLikes",
                                as: "like",
                                cond: { $eq: ["$$like.isLiked", false] },
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "ownerId",
                    foreignField: "channelId",
                    as: "subscribers",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "ownerId",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                fullName: 1,
                                userName: 1,
                                avatar: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "comments",
                    let: { videoId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$videoId"],
                                        },
                                        {
                                            $eq: ["$entityType", "video"],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "comments",
                },
            },
            {
                $project: {
                    title: 1,
                    likeStatus: 1,
                    description: 1,
                    thumbnail: 1,
                    videoFile: 1,
                    noOfComments: { $size: "$comments" },
                    owner: { $arrayElemAt: ["$owner", 0] },
                    duration: 1,
                    quality: 1,
                    isPublished: 1,
                    subscribers: { $size: "$subscribers" },
                    views: 1,
                    likes: 1,
                    dislikes: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);
        if (!video?.length) {
            throw new ApiError(404, "Video not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { video: video[0] },
                    "Video fetched successfully"
                )
            );
    }
);

interface VideoUpdateParams {
    videoId: string;
}
interface VideoUpdateBody {
    title?: string;
    description?: string;
}

// controller to update video details like title, description, thumbnail
const videoUpdate = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId } = req.params as unknown as VideoUpdateParams;
        const { title, description }: VideoUpdateBody = req.body;
        const thumbnailLocalPath: string | undefined = req.file?.path;

        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid Video Id");
        }
        if (!title && !description && !thumbnailLocalPath) {
            throw new ApiError(
                400,
                "Title, description or thumbnail is required"
            );
        }

        const video = await Video.findById(videoId);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        if (title) video.title = title;
        if (description) video.description = description;
        if (thumbnailLocalPath) {
            // delete existing thumbnail
            if (video?.thumbnail?.publicId) {
                const oldThumbnail = await deleteFromCloudinary(
                    video.thumbnail.publicId,
                    "image"
                );

                // check if thumbnail is deleted
                if (!oldThumbnail) {
                    throw new ApiError(500, "Failed to delete thumbnail");
                }
            }

            const thumbnail = await uploadOnCloudinary(
                thumbnailLocalPath,
                "image"
            );
            if (!thumbnail) {
                throw new ApiError(500, "Failed to upload thumbnail");
            }
            video.thumbnail = {
                publicId: thumbnail?.public_id,
                url: thumbnail?.secure_url,
            };
        }

        const updatedVideo = await video.save();
        if (!updatedVideo) {
            throw new ApiError(500, "Failed to update video");
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Video updated successfully")
            // new ApiResponse(200, updatedVideo, "Video updated successfully")
        );
    }
);

interface DeleteVideoParams {
    videoId: string;
}
interface LikeType {
    _id: mongoose.Types.ObjectId;
}
interface CommentType {
    _id: mongoose.Types.ObjectId;
    commentLikes: LikeType[];
}
const deleteVideo = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId } = req.params as unknown as DeleteVideoParams;
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Video id is required");
        }

        const video = await Video.findById(videoId);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        // delete video and thumbnail from cloudinary
        const deleteVideo = await deleteFromCloudinary(
            video.videoFile.publicId,
            "video"
        );
        const deleteThumbnail = await deleteFromCloudinary(
            video.thumbnail.publicId,
            "image"
        );
        if (!deleteVideo) {
            throw new ApiError(500, "Failed to delete video from cloudinary");
        }
        if (!deleteThumbnail) {
            throw new ApiError(
                500,
                "Failed to delete thumbnail from cloudinary"
            );
        }

        const videoDetails = await Video.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
            {
                $lookup: {
                    from: "likes",
                    let: { videoId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$videoId"],
                                        },
                                        {
                                            $eq: ["$entityType", "video"],
                                        },
                                    ],
                                },
                            },
                        },
                        { $project: { _id: 1 } },
                    ],
                    as: "videoLikes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    let: { videoId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$videoId"],
                                        },
                                        {
                                            $eq: ["$entityType", "video"],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "likes",
                                let: { commentId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $eq: [
                                                            "$entityId",
                                                            "$$commentId",
                                                        ],
                                                    },
                                                    {
                                                        $eq: [
                                                            "$entityType",
                                                            "comment",
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                    { $project: { _id: 1 } },
                                ],
                                as: "commentLikes",
                            },
                        },
                        { $project: { commentLikes: 1, _id: 1 } },
                    ],
                    as: "videoComments",
                },
            },
            {
                $project: {
                    videoLikes: 1,
                    videoComments: 1,
                },
            },
        ]);
        if (!videoDetails?.length) {
            throw new ApiError(500, "No likes or comments found");
        }

        // Extract videoLikeId, commentId and LikeId of comments from videoDetails
        const videoLikeIds: mongoose.Types.ObjectId[] =
            videoDetails[0]?.videoLikes.map((like: LikeType) => like._id);

        const commentIds: mongoose.Types.ObjectId[] =
            videoDetails[0]?.videoComments.map(
                (comment: CommentType) => comment._id
            );

        const commentLikeIds: mongoose.Types.ObjectId[] =
            videoDetails[0]?.videoComments.reduce(
                (
                    accumulator: mongoose.Types.ObjectId[],
                    comment: CommentType
                ) => {
                    const LikeIds: mongoose.Types.ObjectId[] =
                        comment.commentLikes.map((like: LikeType) => like._id);
                    return accumulator.concat(LikeIds);
                },
                []
            );

        // delete video, video likes, comments and comments likes
        const delVideo = await Video.findByIdAndDelete(videoId);
        if (!delVideo) {
            throw new ApiError(500, "Failed to delete video");
        }

        const delVideoLikes = await Like.deleteMany({
            _id: { $in: videoLikeIds },
        });
        if (!delVideoLikes?.acknowledged) {
            throw new ApiError(500, "Failed to delete video likes");
        }

        const delComments = await Comment.deleteMany({
            _id: { $in: commentIds },
        });
        if (!delComments?.acknowledged) {
            throw new ApiError(500, "Failed to delete comments of video");
        }

        const delCommentsLikes = await Like.deleteMany({
            _id: { $in: commentLikeIds },
        });
        if (!delCommentsLikes?.acknowledged) {
            throw new ApiError(500, "Failed to delete comments likes of video");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Video deleted successfully"));
    }
);

interface ToggleVideoPublishStatusParams {
    videoId: string;
}

const ToggleVideoPublishStatus = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId } =
            req.params as unknown as ToggleVideoPublishStatusParams;
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid video id");
        }

        const video = await Video.findById(videoId);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        video.isPublished = !video.isPublished;
        await video.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    video,
                    "Publish status updated successfully"
                )
            );
    }
);

export {
    getAllVideo,
    uploadVideo,
    getVideoById,
    videoUpdate,
    deleteVideo,
    ToggleVideoPublishStatus,
};

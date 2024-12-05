import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
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
            sortBy,
            duration,
            userId,
        }: GetAllVideoQuery = req.query;

        const skip = (page - 1) * limit;

        const filter = {
            isPublished: true,
            $text: { $search: query },
        };

        // if (userId) {
        //     if (!isValidObjectId(userId))
        //         filter.ownerId = new mongoose.Types.ObjectId(userId);
        //     else throw new ApiError(400, "Invalid user id");
        // }

        const sortCritieria = {}; // define

        // const videos = await Video.aggregate([
        //     { $match: filter },
        //     {
        //         $lookup: {
        //             from: "User",
        //             localField: "ownerId",
        //             foreignField: "_id",
        //             as: "owner",
        //             pipeline: [
        //                 {
        //                     $project: {
        //                         fullName: 1,
        //                         userName: 1,
        //                         avatar: 1,
        //                     },
        //                 },
        //             ],
        //         },
        //     },
        //     { $addFields: { owner: { $arrayElemAt: ["$owner", 0] } } },
        //     {
        //         $sort: {
        //             sortCritieria: sortType?.toLowerCase() === "asc" ? 1 : -1,
        //         },
        //     },
        //     { $skip: skip },
        //     { $limit: limit },
        // ]);
    }
);

interface UploadVideoBody {
    title?: string;
    description?: string;
    isPublished?: boolean;
}
interface UploadedFile {
    path: string;
}
interface CustomFiles {
    thumbnail?: UploadedFile[];
    video?: UploadedFile[];
}
interface FileType {
    files?: CustomFiles;
}

const uploadVideo = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { title, description, isPublished }: UploadVideoBody = req.body;
        if (!title || !description || !isPublished) {
            const message = !title
                ? "Title is required"
                : !description
                  ? "Description is required"
                  : "isPublished is required";
            throw new ApiError(400, message);
        }

        const thumbnailLocalPath = (req as FileType).files?.thumbnail?.[0]
            ?.path;
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
            isPublished: isPublished,
        });

        // check if video is created
        const uploadedVideo = await Video.findById(video?._id);
        if (!uploadedVideo) {
            throw new ApiError(500, "Failed to upload video");
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    uploadedVideo,
                    "Video uploaded successfully"
                )
            );
    }
);

interface GetVideoByIdParams {
    videoId?: string;
}

const getVideoById = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId }: GetVideoByIdParams = req.params;
        if (!isValidObjectId(videoId)) {
            throw new ApiError(400, "Invalid video id");
        }
        if (!videoId) {
            throw new ApiError(400, "Video id is required");
        }

        // get video details like likes, dislikes
        const video = await Video.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
            {
                $lookup: {
                    from: "Like",
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
                                            $eq: ["$entityType", "Video"],
                                        },
                                    ],
                                },
                            },
                        },
                        { $project: { _id: 1, isLiked: 1 } },
                    ],
                    as: "videoLikes",
                },
            },
            {
                $addFields: {
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
                $project: {
                    title: 1,
                    description: 1,
                    thumbnail: 1,
                    videoFile: 1,
                    ownerId: 1,
                    duration: 1,
                    quality: 1,
                    isPublished: 1,
                    likes: 1,
                    dislikes: 1,
                },
            },
        ]);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video fetched successfully"));
    }
);

interface GetVideoByIdsBody {
    videoIds?: string[];
}
const getVideosByIds = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoIds }: GetVideoByIdsBody = req.body;
        if (!isValidObjectId(videoIds)) {
            throw new ApiError(400, "Invalid video id");
        }
        if (!videoIds) {
            throw new ApiError(400, "Video id is required");
        }

        // get video details like likes, dislikes
        const video = await Video.aggregate([
            {
                $match: {
                    _id: {
                        $in: videoIds.map(
                            (id: any) => new mongoose.Types.ObjectId(id)
                        ),
                    },
                },
            },
            {
                $lookup: {
                    from: "Like",
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
                                            $eq: ["$entityType", "Video"],
                                        },
                                    ],
                                },
                            },
                        },
                        { $project: { _id: 1, isLiked: 1 } },
                    ],
                    as: "videoLikes",
                },
            },
            {
                $addFields: {
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
                $project: {
                    title: 1,
                    description: 1,
                    thumbnail: 1,
                    videoFile: 1,
                    ownerId: 1,
                    duration: 1,
                    quality: 1,
                    isPublished: 1,
                    likes: 1,
                    dislikes: 1,
                },
            },
        ]);
        if (!video) {
            throw new ApiError(404, "Video not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, video, "Video fetched successfully"));
    }
);

interface VideoUpdateParams {
    videoId?: string;
}
interface VideoUpdateBody {
    title?: string;
    description?: string;
}

// controller to update video details like title, description, thumbnail
const videoUpdate = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId }: VideoUpdateParams = req.params;
        const { title, description }: VideoUpdateBody = req.body;
        const thumbnailLocalPath: string | undefined = req.file?.path;

        if (!videoId) {
            throw new ApiError(400, "Video id is required");
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

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedVideo, "Video updated successfully")
            );
    }
);

interface DeleteVideoParams {
    videoId?: string;
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
        const { videoId }: DeleteVideoParams = req.params;
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
                    from: "Like",
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
                                            $eq: ["$entityType", "Video"],
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
                    from: "Comment",
                    localField: "_id",
                    foreignField: "videoId",
                    as: "videoComments",
                    pipeline: [
                        {
                            $lookup: {
                                from: "Like",
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
                                                            "Comment",
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
    videoId?: string;
}

const ToggleVideoPublishStatus = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { videoId }: ToggleVideoPublishStatusParams = req.params;
        if (!videoId) {
            throw new ApiError(400, "Video id is required");
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
    getVideosByIds,
    ToggleVideoPublishStatus,
};

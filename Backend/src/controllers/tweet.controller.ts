import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model";
import { Comment } from "../models/comment.model";
import { Like } from "../models/like.model";
import { UserType } from "types/user.type";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import fs from "fs";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

interface RequestWithUser extends Request {
    user: UserType;
}
interface CreateTweetBody {
    content?: string;
}
interface CreateTweetData {
    ownerId: string;
    content: string;
    image?: {
        publicId: string;
        url: string;
    };
}

const createTweet = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { content }: CreateTweetBody = req.body;
        const imageLocalPath: string | undefined = req.file?.path;
        if (!content) {
            throw new ApiError(400, "Content is required");
        }

        let uploadImage: UploadApiResponse | null = null;
        if (imageLocalPath) {
            uploadImage = await uploadOnCloudinary(imageLocalPath, "image");
            if (!uploadImage) {
                throw new ApiError(500, "Failed to upload image");
            }
        }

        const data: CreateTweetData = {
            ownerId: req.user?._id,
            content,
        };
        if (uploadImage) {
            data.image = {
                publicId: uploadImage.public_id,
                url: uploadImage.secure_url,
            };
        }

        const tweet = await Tweet.create(data);
        if (!tweet) {
            throw new ApiError(500, "Failed to create tweet");
        }

        return res
            .status(201)
            .json(new ApiResponse(201, tweet, "Tweet created successfully"));
    }
);

interface GetUserTweetParams {
    userId?: string;
}

const getUserTweet = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { userId }: GetUserTweetParams = req.params;
        if (!isValidObjectId(userId)) {
            throw new ApiError(400, "Invalid user id");
        }

        const tweets = await Tweet.aggregate([
            { $match: { ownerId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "User",
                    localField: "ownerId",
                    foreignField: "_id",
                    as: "owner",
                    pipeline: [
                        {
                            $project: {
                                fullName: 1,
                                avatar: 1,
                                userName: 1,
                            },
                        },
                    ],
                },
            },
            // {
            //     $lookup: {
            //         from: "Like",
            //         localField: "_id",
            //         foreignField: "tweetId",
            //         as: "Likes",
            //     },
            // },
            {
                $lookup: {
                    from: "Like",
                    let: { tweetId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$tweetId"],
                                        },
                                        {
                                            $eq: ["$entityType", "Tweet"],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "Likes",
                },
            },
            {
                $lookup: {
                    from: "Comment",
                    localField: "_id",
                    foreignField: "tweetId",
                    as: "Comments",
                },
            },
            {
                $addFields: {
                    likes: {
                        $size: {
                            $filter: {
                                input: "$Likes",
                                as: "like",
                                cond: { $eq: ["$$like.isLiked", true] },
                            },
                        },
                    },
                    dislikes: {
                        $size: {
                            $filter: {
                                input: "$Likes",
                                as: "like",
                                cond: { $eq: ["$$like.isLiked", false] },
                            },
                        },
                    },
                    comments: { $size: "$Comments" },
                    owner: { $arrayElemAt: ["$owner", 0] },
                },
            },
        ]);

        if (!tweets?.length) {
            throw new ApiError(404, "No tweets found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, tweets, "User tweets fetched successfully")
            );
    }
);

interface UpdateTweetParams {
    tweetId?: string;
}
interface UpdateTweetBody {
    content?: string;
}

const updateTweet = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { tweetId }: UpdateTweetParams = req.params;
        const { content }: UpdateTweetBody = req.body;
        if (!tweetId || !content) {
            const message: string = !tweetId
                ? "Tweet id is required"
                : "Content is required";
            throw new ApiError(400, message);
        }

        const tweet = await Tweet.findByIdAndUpdate(
            tweetId,
            { $set: { content } },
            { new: true }
        );
        if (!tweet) {
            throw new ApiError(500, "Failed to update tweet");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
    }
);

interface UpdateTweetImageParams {
    tweetId?: string;
}

const updateTweetImage = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { tweetId }: UpdateTweetImageParams = req.params;
        const ImageLocalPath: string | undefined = req.file?.path;
        if (!tweetId || !ImageLocalPath) {
            const message = !tweetId
                ? "Tweet id is required"
                : "Image is required";
            throw new ApiError(400, message);
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            throw new ApiError(404, "No tweet found");
        }

        if (tweet?.image?.publicId) {
            const oldImage = await deleteFromCloudinary(
                tweet.image.publicId,
                "image"
            );
            if (!oldImage) {
                fs.unlinkSync(ImageLocalPath);
                throw new ApiError(500, "Failed to delete old image");
            }
        }

        const Image = await uploadOnCloudinary(ImageLocalPath, "image");
        if (!Image) {
            throw new ApiError(500, "Failed to upload image");
        }

        tweet.image = { publicId: Image.public_id, url: Image.secure_url };
        await tweet.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(
                new ApiResponse(200, tweet, "Tweet image updated successfully")
            );
    }
);

interface DeleteTweetParams {
    tweetId?: string;
}
interface LikeType {
    _id: mongoose.Types.ObjectId;
}
interface CommentType {
    _id: mongoose.Types.ObjectId;
    commentLikes: LikeType[];
}
const deleteTweet = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { tweetId }: DeleteTweetParams = req.params;
        if (!tweetId) {
            throw new ApiError(400, "Tweet id is required");
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            throw new ApiError(404, "Tweet not found");
        }

        const tweetDetails = await Tweet.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(tweetId) } },
            {
                $lookup: {
                    from: "Like",
                    let: { tweetId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$entityId", "$$tweetId"],
                                        },
                                        {
                                            $eq: ["$entityType", "Tweet"],
                                        },
                                    ],
                                },
                            },
                        },
                        { $project: { _id: 1 } },
                    ],
                    as: "tweetLikes",
                },
            },
            {
                $lookup: {
                    from: "Comment",
                    localField: "_id",
                    foreignField: "tweetId",
                    as: "tweetComments",
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
                    tweetLikes: 1,
                    tweetComments: 1,
                },
            },
        ]);
        if (!tweetDetails?.length) {
            throw new ApiError(500, "No likes or comments found");
        }

        // Extract videoLikeId, commentId and LikeId of comments from videoDetails
        const tweetLikeIds: mongoose.Types.ObjectId[] =
            tweetDetails[0]?.tweetLikes.map((like: LikeType) => like._id);
        const commentIds: mongoose.Types.ObjectId[] =
            tweetDetails[0]?.tweetComments.map(
                (comment: CommentType) => comment._id
            );
        const commentLikeIds: mongoose.Types.ObjectId[] =
            tweetDetails[0]?.tweetComments.reduce(
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

        // delete tweet, Tweet likes, comments and comments likes
        const delTweet = await Tweet.findByIdAndDelete(tweetId);
        if (!delTweet) {
            throw new ApiError(500, "Failed to delete tweet");
        }

        const delTweetLikes = await Like.deleteMany({
            _id: { $in: tweetLikeIds },
        });
        if (!delTweetLikes?.acknowledged) {
            throw new ApiError(500, "Failed to delete tweet likes");
        }

        const delComments = await Comment.deleteMany({
            _id: { $in: commentIds },
        });
        if (!delComments?.acknowledged) {
            throw new ApiError(500, "Failed to delete comments of tweet");
        }

        const delCommentsLikes = await Like.deleteMany({
            _id: { $in: commentLikeIds },
        });
        if (!delCommentsLikes?.acknowledged) {
            throw new ApiError(500, "Failed to delete comments likes of tweet");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Tweet deleted successfully"));
    }
);

export {
    createTweet,
    getUserTweet,
    updateTweet,
    updateTweetImage,
    deleteTweet,
};

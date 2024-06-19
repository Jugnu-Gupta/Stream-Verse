import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import fs from "fs";


const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { content } = req.body;
    const imageLocalPath = req?.file?.path;
    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    let uploadImage = null;
    if (imageLocalPath) {
        uploadImage = await uploadOnCloudinary(imageLocalPath);
        if (!image) {
            throw new ApiError(500, "Failed to upload image");
        }
    }

    const tweet = await Tweet.create({
        ownerId: req.user?._id,
        content,
        image: uploadImage ? { publicId: image.public_id, url: image.secure_url } : null,
    });
    if (!tweet) {
        throw new ApiError(500, "Failed to create tweet");
    }

    return res.status(201).json(
        new ApiResponse(201, tweet, "Tweet created successfully")
    );
})


const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets

    const { userId } = req.params;
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
                pipeline: [{
                    $project: {
                        fullName: 1,
                        avatar: 1,
                        userName: 1
                    }
                }]
            }
        },
        {
            $lookup: {
                from: "Like",
                localField: "_id",
                foreignField: "tweetId",
                as: "Likes"
            }
        },
        {
            $lookup: {
                from: "Comment",
                localField: "_id",
                foreignField: "tweetId",
                as: "Comments"
            }
        },
        {
            $addFields: {
                likes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", true] }
                        }
                    }
                },
                dislikes: {
                    $size: {
                        $filter: {
                            input: "$Likes",
                            as: "like",
                            cond: { $eq: ["$$like.isLiked", false] }
                        }
                    }
                },
                comments: { $size: "$Comments" },
                owner: { $arrayElemAt: ["$owner", 0] }
            }
        }
    ]);

    if (!tweets?.length) {
        throw new ApiError(404, "No tweets found");
    }

    return res.status(200).json(
        new ApiResponse(200, { tweets }, "User tweets fetched successfully")
    );
})


const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet

    const { tweetId } = req.params;
    const { content } = req.body;
    if (!tweetId || !content) {
        const message = !tweetId ? "Tweet id is required" : "Content is required";
        throw new ApiError(400, message);
    }

    const tweet = await Tweet.findByIdAndUpdate(tweetId, { $set: { content } }, { new: true });
    if (!tweet) {
        throw new ApiError(500, "Failed to update tweet");
    }

    return res.status(200).json(
        new ApiResponse(200, tweet, "Tweet updated successfully")
    );
})


const updateTweetImage = asyncHandler(async (req, res) => {
    //TODO: update tweet

    const { tweetId } = req.params;
    const ImageLocalPath = req?.file?.path;
    if (!tweetId || !ImageLocalPath) {
        const message = !tweetId ? "Tweet id is required" : "Image is required";
        throw new ApiError(400, message);
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
        throw new ApiError(404, "No tweet found");
    }

    if (tweet?.image?.publicId) {
        const oldImage = await deleteFromCloudinary(tweet.image.publicId, "image");
        if (!oldImage) {
            fs.unlinkSync(ImageLocalPath);
            throw new ApiError(500, "Failed to delete old image");
        }
    }

    const Image = await uploadOnCloudinary(ImageLocalPath);
    if (!Image) {
        throw new ApiError(500, "Failed to upload image");
    }

    tweet.image = { publicId: Image.public_id, url: Image.secure_url };
    await tweet.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, tweet, "Tweet image updated successfully")
    );
})


const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet

    const { tweetId } = req.params;
    if (!tweetId) {
        throw new ApiError(400, "Tweet id is required");
    }

    const tweet = await Tweet.findByIdAndDelete(tweetId);
    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Tweet deleted successfully")
    );
})

export { createTweet, getUserTweets, updateTweet, updateTweetImage, deleteTweet };
import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserType } from "../types/user.type";
import { Playlist } from "../models/playlist.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

interface RequestWithUser extends Request {
    user: UserType;
}
interface CreatePlaylistBody {
    name?: string;
    description?: string;
}
const createPlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { name, description }: CreatePlaylistBody = req.body;
        if (!name || !description) {
            const message = !name
                ? "Name is required"
                : "Description is required";
            throw new ApiError(400, message);
        }
        const playlist = await Playlist.create({
            name,
            description,
            ownerId: req.user._id,
        });

        if (!playlist) {
            throw new ApiError(400, "Failed to create playlist");
        }

        return res
            .status(201)
            .json(new ApiResponse(201, { playlist }, "Playlist created"));
    }
);
interface GetUserPlaylistParams {
    userId?: string;
}
const getUserPlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { userId }: GetUserPlaylistParams = req.params;
        if (!userId) {
            throw new ApiError(400, "User id is required");
        }

        const playlists = await Playlist.find({ ownerId: userId });
        if (!playlists?.length) {
            throw new ApiError(404, "No playlists found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { playlists }, "User playlists"));
    }
);

interface GetPlaylistByIdParams {
    playlistId?: string;
}

const getPlaylistById = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { playlistId }: GetPlaylistByIdParams = req.params;
        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required");
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { playlist }, "Playlist found"));
    }
);

interface AddVideoInPlaylistParams {
    playlistId?: string;
    videoId?: string;
}
const addVideoInPlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { playlistId, videoId }: AddVideoInPlaylistParams = req.params;
        if (!playlistId || !videoId) {
            const message = !playlistId
                ? "playlist id is required"
                : "video id is required";
            throw new ApiError(400, message);
        }
        const video_Id = new mongoose.Schema.Types.ObjectId(videoId);

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }
        if (playlist.videos.includes(video_Id)) {
            throw new ApiError(400, "Video already exists in playlist");
        }

        playlist.videos.push(video_Id);
        await playlist.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(
                new ApiResponse(200, { playlist }, "Video added to playlist")
            );
    }
);

interface DeleteVideoFromPlaylistParams {
    playlistId?: string;
    videoId?: string;
}

const deleteVideoFromPlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { playlistId, videoId }: DeleteVideoFromPlaylistParams =
            req.params;
        if (!playlistId || !videoId) {
            const message = !playlistId
                ? "Playlist id is required"
                : "Video id is required";
            throw new ApiError(400, message);
        }
        const video_Id = new mongoose.Schema.Types.ObjectId(videoId);

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }
        if (!playlist.videos.includes(video_Id)) {
            throw new ApiError(400, "Video does not exist in playlist");
        }

        playlist.videos = playlist.videos.filter((id) => id !== video_Id);
        await playlist.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { playlist },
                    "Video removed from playlist"
                )
            );
    }
);

interface DeletePlaylistParams {
    playlistId?: string;
}

const deletePlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { playlistId }: DeletePlaylistParams = req.params;
        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required");
        }

        const playlist = await Playlist.findByIdAndDelete(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Playlist deleted"));
    }
);

interface UpdatePlaylistParams {
    playlistId?: string;
}
interface UpdatePlaylistBody {
    name?: string;
    description?: string;
}
const updatePlaylist = asyncHandler(
    async (req: RequestWithUser, res: Response) => {
        const { playlistId }: UpdatePlaylistParams = req.params;
        const { name, description }: UpdatePlaylistBody = req.body;
        if (!playlistId) {
            throw new ApiError(400, "Playlist id is required");
        }
        if (!name && !description) {
            throw new ApiError(400, "Name or description is required");
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // update playlist
        playlist.name = name ? name : playlist.name;
        playlist.description = description ? description : playlist.description;
        await playlist.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, { playlist }, "Playlist updated"));
    }
);

export {
    createPlaylist,
    getUserPlaylist,
    getPlaylistById,
    addVideoInPlaylist,
    deleteVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};

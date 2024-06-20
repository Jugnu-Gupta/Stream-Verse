import { Playlist } from "../models/playlist.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const playlistCreate = asyncHandler(async (req, res) => {
    //TODO: create playlist

    const { name, description } = req.body;
    if (!name || !description) {
        const message = !name ? "Name is required" : "Description is required";
        throw new ApiError(400, message);
    }
    const playlist = await Playlist.create({
        name,
        description,
        ownerId: req.user._id
    });

    if (!playlist) {
        throw new ApiError(400, "Failed to create playlist");
    }

    return res.status(201).json(
        new ApiResponse(201, { playlist }, "Playlist created")
    );
})


const playlistFetchUser = asyncHandler(async (req, res) => {
    //TODO: get user playlists

    const { userId } = req.params;
    if (!userId) {
        throw new ApiError(400, "User id is required")
    }

    const playlists = await Playlist.find({ ownerId: userId });
    if (!playlists?.length) {
        throw new ApiError(404, "No playlists found");
    }

    return res.status(200).json(
        new ApiResponse(200, { playlists }, "User playlists")
    );
})


const playlistFetchById = asyncHandler(async (req, res) => {
    //TODO: get playlist by id

    const { playlistId } = req.params;
    if (!playlistId) {
        throw new ApiError(400, "Playlist id is required");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new ApiResponse(200, { playlist }, "Playlist found")
    );
})


const playlistAddVideo = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    if (!playlistId || !videoId) {
        const message = !playlistId ? "playlist id is required" : "video id is required";
        throw new ApiError(400, message);
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already exists in playlist");
    }

    playlist.videos.push(videoId);
    await playlist.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, { playlist }, "Video added to playlist")
    );
})


const playlistRemoveVideo = asyncHandler(async (req, res) => {
    // TODO: remove video from playlist

    const { playlistId, videoId } = req.params
    if (!playlistId || !videoId) {
        const message = !playlistId ? "Playlist id is required" : "Video id is required"
        throw new ApiError(400, message)
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (!playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video does not exist in playlist");
    }

    playlist.videos = playlist.videos.filter((id) => id !== videoId);
    await playlist.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, { playlist }, "Video removed from playlist")
    );
})


const playlistDelete = asyncHandler(async (req, res) => {
    // TODO: delete playlist

    const { playlistId } = req.params;
    if (!playlistId) {
        throw new ApiError(400, "Playlist id is required");
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Playlist deleted")
    );
})


const playlistUpdate = asyncHandler(async (req, res) => {
    //TODO: update playlist

    const { playlistId } = req.params
    const { name, description } = req.body
    if (!playlistId) {
        throw new ApiError(400, "Playlist id is required")
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

    return res.status(200).json(
        new ApiResponse(200, { playlist }, "Playlist updated")
    );
})


export {
    playlistCreate, playlistFetchUser, playlistFetchById, playlistAddVideo,
    playlistRemoveVideo, playlistDelete, playlistUpdate
}
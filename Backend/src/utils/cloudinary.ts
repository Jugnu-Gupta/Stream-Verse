import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (
    localFilePath: string | undefined,
    resourceType: "image" | "video" | "raw" | "auto"
) => {
    try {
        if (!localFilePath || !resourceType) return null;

        // upload file on cloudinary.
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
        });

        // remove the locally saved temporary file.
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // remove the locally saved temporary file.
        fs.unlinkSync(localFilePath);

        return null;
    }
};

const deleteFromCloudinary = async (
    publicId: string,
    resourceType: "image" | "video" | "raw" | "auto"
) => {
    try {
        if (!publicId || !resourceType) return null;

        // delete file from cloudinary.
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return response;
    } catch (error) {
        return null;
    }
};

const streamFromCloudinary = async (publicId: string) => {
    try {
        if (!publicId) return null;

        // Fetch the video from Cloudinary
        const videoUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}.mp4`;

        const response = await axios({
            method: "get",
            url: videoUrl,
            responseType: "stream",
        });
        return response;
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary, streamFromCloudinary };

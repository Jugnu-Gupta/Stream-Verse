import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // upload file on cloudinary.
        const response = await cloudinary.uploader.upload(localFilePath,
            { resource_type: "auto" });

        // remove the locally saved temporary file.
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // remove the locally saved temporary file.
        fs.unlinkSync(localFilePath);

        return null;
    }
};

const deleteFromCloudinary = async (publicId, resourceType) => {
    try {
        if (!publicId || !resourceType) return null;

        // delete file from cloudinary.
        const response = await cloudinary.uploader.destroy(publicId,
            { resource_type: resourceType });

        return response;
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
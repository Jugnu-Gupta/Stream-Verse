import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
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
        return response;
    } catch (error) {
        return null;
    } finally {
        // remove the locally saved temporary file.
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
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

export { uploadOnCloudinary, deleteFromCloudinary };

import mongoose, { Document } from "mongoose";

interface UserType extends Document {
    username: string;
    email: string;
    fullName: string;
    password: string;
    isVerified: boolean;
    avatar?: {
        publicId: string;
        url: string;
        _id: false;
    };
    coverImage?: {
        publicId: string;
        url: string;
        _id: false;
    };
    watchHistory: {
        videoId: mongoose.Schema.Types.ObjectId;
        watchedAt: Date;
        _id: false;
    }[];
    refreshToken?: string;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
    isPasswordCorrect: (password: string) => Promise<boolean>;
}

export type { UserType };

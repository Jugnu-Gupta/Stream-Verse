import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: 'text',
    },
    avatar: {
        // cloudinary: publicId and url
        type: {
            publicId: String,
            url: String
        },
        _id: false,
        require: true,
    },
    coverImage: {
        // cloudinary: publicId and url
        type: {
            publicId: String,
            url: String
        },
        _id: false
    },
    refreshToken: {
        type: String,
    },
    watchHistory: [
        {
            videoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
            watchedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY, }
    );
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY, }
    );
}
// update queries.
export const User = mongoose.model("User", userSchema);
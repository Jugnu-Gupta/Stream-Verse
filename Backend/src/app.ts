import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import likeRouter from "./routes/like.route";
import videoRouter from "./routes/video.route";
import tweetRouter from "./routes/tweet.route";
import commentRouter from "./routes/comment.route";
import playlistRouter from "./routes/playlist.route";
import dashboardRouter from "./routes/dashboard.route";
import healthCheckRouter from "./routes/healthCheck.route";
import subscriptionRouter from "./routes/subscription.route";

// routes declaration/mount
app.use("/api/v1/auths", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export { app };

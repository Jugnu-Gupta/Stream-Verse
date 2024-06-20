import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true, }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from './routes/user.route.js';
import likeRouter from './routes/like.route.js';
import videoRouter from './routes/video.route.js';
import tweetRouter from './routes/tweet.route.js';
import commentRouter from './routes/comment.route.js';
import playlistRouter from './routes/playlist.route.js';
import dashboardRouter from './routes/dashboard.route.js';
import healthCheckRouter from './routes/healthCheck.route.js';
import subscriptionRouter from './routes/subscription.route.js';


// routes declaration/mount
app.use('/api/v1/users', userRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/videos', videoRouter); // video search is incomepete.
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/playlists', playlistRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/healthCheck', healthCheckRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


export { app };
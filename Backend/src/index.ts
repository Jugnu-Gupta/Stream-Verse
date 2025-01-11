import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./db/connectDB";
import { app } from "./app";

const port = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGODB connection Failed!!!");
    });

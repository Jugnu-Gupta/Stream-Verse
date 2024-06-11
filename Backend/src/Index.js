import pkg from 'dotenv/config.js';
import connectDB from "./db/connectDB.js";


const port = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed!!!");
    })

















/*
import express from "express";
const app = express();

// Immediately Invoked Function Expressions (IIFE).
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw error
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})();

*/
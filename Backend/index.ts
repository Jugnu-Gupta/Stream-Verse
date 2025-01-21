import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/db/connectDB";
import { app } from "./src/app";

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

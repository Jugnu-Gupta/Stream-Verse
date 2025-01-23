import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string | undefined) => void
    ) => {
        const tempPath = "/tmp";
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true }); // Ensure directory exists
        }
        cb(null, tempPath);
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string | undefined) => void
    ) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (file.fieldname === "image") {
        const filetypes = /jpeg|jpg|png|jfif|pjp|pjpeg/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error("Images only of type jpeg,jpg,png,jfif,pjp,pjpeg!"));
        }
    } else if (file.fieldname === "video") {
        const filetypes = /mp4/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error("Videos only of type mp4!"));
        }
    } else {
        cb(new Error("Invalid file type!"));
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter,
});

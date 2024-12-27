import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|jfif|pjp|pjpeg/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (extname) {
            return cb(null, true);
        } else {
            cb(
                new Error(
                    "Images only of one of the type jpeg, jpg, png, jfif, pjpand pjpeg!"
                )
            );
        }
    },
});

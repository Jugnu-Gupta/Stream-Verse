import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    },
});

// File filter to allow only certain file types
const imagefileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = file.originalname?.split(".")?.pop()?.toLowerCase();
    const mimeType = file.mimetype;

    if (allowedTypes.test(extName) && allowedTypes.test(mimeType)) {
        return cb(null, true);
    } else {
        cb(new Error('Only images of types jpeg, jpg and png are allowed'));
    }
};

// File filter to allow only certain file types
const videofileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mov|mpg|mpeg4|wmv|flv|webm|avi|mkv/;
    const extName = file.originalname?.split(".")?.pop()?.toLowerCase();
    const mimeType = file.mimetype;

    if (allowedTypes.test(extName) && allowedTypes.test(mimeType)) {
        return cb(null, true);
    } else {
        cb(new Error('Only videos of type mp4, flv, avi, mkv, mov, wmv, webm, mpg and mpeg4 are allowed'));
    }
};

export const uploadImage = multer({
    storage: storage,
    fileFilter: imagefileFilter,
    // Limit image size to 10 MB
    limits: { fileSize: 1024 * 1024 * 10 }
});

export const uploadVideo = multer({
    storage: storage,
    fileFilter: videofileFilter,
    // Limit video size to 100 MB
    limits: { fileSize: 1024 * 1024 * 100 }
});
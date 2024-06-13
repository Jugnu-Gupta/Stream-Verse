import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public/temp");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


// File filter to allow only certain file types
const imagefileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images of types jpeg, jpg and png are allowed'));
    }
};

const videofileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mov|mpg|mpeg4|wmv|flv|webm|avi|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
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
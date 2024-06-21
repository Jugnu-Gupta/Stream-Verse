import { ApiError } from "./apiError.js";

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => res.status(err.code || 500).json({
                success: false,
                message: err.message,
            }));
    }
}


// const asyncHandler = (requestHandler) => async (req, res, next) => {
//     try {
//         await requestHandler(req, res, next);
//     }
//     catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }


export { asyncHandler };
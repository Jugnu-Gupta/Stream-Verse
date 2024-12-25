import { ApiError } from "./apiError";
import { Response, Request, NextFunction } from "express";

const asyncHandler = (requestHandler: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            console.error("error:", JSON.stringify(err, null, 2));
            res.status(err.statusCode || 500).json(
                new ApiError(err.statusCode || 500, err.message, err.data)
            );
        });
    };
};

export { asyncHandler };

import { Request, Response } from "express";
import { User } from "models/user.model";
import { asyncHandler } from "./asyncHandler";
import { ApiError } from "./apiError";
import { ApiResponse } from "./apiResponse";

const suggestAvailableUserName = asyncHandler(
    async (req: Request, res: Response) => {
        const { prefix } = req.query;
        if (!prefix) {
            throw new ApiError(400, "Prefix is required");
        }

        const availableUsername = await findAvailableUsername(prefix);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { availableUsername },
                    "Available username found"
                )
            );
    }
);

const findAvailableUsername = asyncHandler(async (prefix: string) => {
    const prefixRegex = new RegExp(`^${prefix}\\d+$`);

    const results = await User.aggregate([
        {
            $match: {
                handle: { $regex: prefixRegex },
            },
        },
        {
            $project: {
                suffix: {
                    $toInt: {
                        $substr: ["$handle", { $strLenCP: prefix }, -1],
                    },
                },
            },
        },
        {
            $sort: { suffix: 1 },
        },
    ]);

    let expectedSuffix = 1;
    for (const result of results) {
        if (result.suffix !== expectedSuffix) {
            break;
        }
        expectedSuffix++;
    }

    return `${prefix}${expectedSuffix}`;
});

export { suggestAvailableUserName };

import { User } from "../models/user.model";

interface UserSuffix {
    suffix: number;
}

const getUserSuffixes = async (prefix: string) => {
    try {
        const prefixRegex: string = `^${prefix}\\d+$`;

        const results: UserSuffix[] = await User.aggregate([
            {
                $match: {
                    userName: { $regex: prefixRegex, $options: "i" },
                },
            },
            {
                $project: {
                    suffix: {
                        $toInt: {
                            $toInt: {
                                $substrCP: [
                                    "$userName",
                                    prefix.length,
                                    { $strLenCP: "$userName" },
                                ],
                            },
                        },
                    },
                },
            },
            {
                $sort: { suffix: 1 },
            },
        ]);

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getAvailableUserName = async (prefix: string) => {
    try {
        const results: UserSuffix[] = await getUserSuffixes(prefix);
        if (!results) return null;

        let expectedSuffix: number = results.length + 1;
        let low: number = 0;
        let high: number = results.length - 1;
        while (low <= high) {
            let mid: number = Math.floor((low + high) / 2);
            if (results[mid].suffix > mid + 1) {
                expectedSuffix = mid + 1;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return `${prefix}${expectedSuffix}`;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getAvailableUserName };

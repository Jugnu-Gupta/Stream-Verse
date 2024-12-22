import { formatNumber } from "./FormatNumber";

export const computeLikeCount = (
	likes: number | undefined,
	likeStatus: number | undefined,
	isLiked: boolean
) => {
	let likeCount = parseInt(likes?.toString() || "0");

	if (isLiked && likeStatus !== 1) {
		likeCount += 1;
	} else if (!isLiked && likeStatus === 1) {
		likeCount -= 1;
	}
	return formatNumber(likeCount);
};

export const computeDislikeCount = (
	dislikes: number | undefined,
	likeStatus: number | undefined,
	isDisliked: boolean
) => {
	let dislikeCount = parseInt(dislikes?.toString() || "0");
	if (isDisliked && likeStatus !== -1) {
		dislikeCount += 1;
	} else if (!isDisliked && likeStatus === -1) {
		dislikeCount -= 1;
	}
	return formatNumber(dislikeCount);
};

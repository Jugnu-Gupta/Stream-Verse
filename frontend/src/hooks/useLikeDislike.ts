import React, { Dispatch, SetStateAction, useEffect } from "react";
import makeApiRequest from "../utils/MakeApiRequest";
import { ErrorType } from "../type/Error.type";
import toast from "react-hot-toast";

const handleDBLike = (
	entityId: string,
	entityType: string,
	likeVal: boolean,
	setIsLiked: Dispatch<SetStateAction<boolean>>
) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/like`,
	})
		.then(() => {
			setIsLiked(likeVal);
		})
		.catch((error: ErrorType) => {
			if (error.response.data.statusCode === 401) {
				toast.error("Please login to like/dislike");
			}
			console.error(error.response.data.message);
		});
};

const handleDBDislike = (
	entityId: string,
	entityType: string,
	dislikeVal: boolean,
	setIsDisliked: Dispatch<SetStateAction<boolean>>
) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/dislike`,
	})
		.then(() => {
			setIsDisliked(dislikeVal);
		})
		.catch((error: ErrorType) => {
			if (error.response.data.statusCode === 401) {
				toast.error("Please login to like/dislike");
			}
			console.error(error.response.data.message);
		});
};

interface LikesAndDislikesProps {
	entityType: string;
	entityId: string;
	likeStatus?: number;
}
const useLikeDislike = ({
	entityType,
	entityId,
	likeStatus,
}: LikesAndDislikesProps) => {
	const [isLiked, setIsLiked] = React.useState<boolean>(false);
	const [isDisliked, setIsDisliked] = React.useState<boolean>(false);

	const handleLike = () => {
		if (isLiked) {
			handleDBLike(entityId, entityType, false, setIsLiked);
		} else {
			handleDBLike(entityId, entityType, true, setIsLiked);
		}
		setIsDisliked(false);
	};

	const handleDislike = () => {
		if (isDisliked) {
			handleDBDislike(entityId, entityType, false, setIsDisliked);
		} else {
			handleDBDislike(entityId, entityType, true, setIsDisliked);
		}
		setIsLiked(false);
	};

	useEffect(() => {
		if (!likeStatus) return;
		else if (likeStatus === 1) {
			setIsLiked(true);
		} else if (likeStatus === -1) {
			setIsDisliked(true);
		}
	}, [likeStatus]);

	return { isLiked, isDisliked, handleLike, handleDislike };
};

export default useLikeDislike;

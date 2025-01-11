import React, { useEffect } from "react";
import makeApiRequest from "../utils/MakeApiRequest";
import { ErrorType } from "../Types/Error.type";

const handleDBLike = (entityId: string, entityType: string) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/like`,
	})
		.then((response) => {
			console.log("likes:", response);
		})
		.catch((error: ErrorType) => {
			console.error(error.response.data.message);
		});
};

const handleDBDislike = (entityId: string, entityType: string) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/dislike`,
	})
		.then((response) => {
			console.log("likes:", response);
		})
		.catch((error: ErrorType) => {
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
			setIsLiked(false);
			handleDBLike(entityId, entityType);
		} else {
			setIsLiked(true);
			handleDBLike(entityId, entityType);
		}
		setIsDisliked(false);
	};

	const handleDislike = () => {
		if (isDisliked) {
			setIsDisliked(false);
			handleDBDislike(entityId, entityType);
		} else {
			setIsDisliked(true);
			handleDBDislike(entityId, entityType);
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

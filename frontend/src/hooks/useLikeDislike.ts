import React, { useEffect } from "react";
import makeApiRequest from "../utils/MakeApiRequest";

const handleDBLike = (entityId: string, entityType: string) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/like`,
	})
		// eslint-disable-next-line
		.then((response: any) => {
			console.log("likes:", response.data);
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
};

const handleDBDislike = (entityId: string, entityType: string) => {
	if (!entityId || !entityType) return;

	makeApiRequest({
		method: "post",
		url: `/api/v1/likes/${entityType}/${entityId}/dislike`,
	})
		// eslint-disable-next-line
		.then((response: any) => {
			console.log("likes:", response.data);
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
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

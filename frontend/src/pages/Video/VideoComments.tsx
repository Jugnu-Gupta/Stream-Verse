import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import { useNavigate } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { addComments, clearComments } from "../../context/slices/CommentSlice";
import { useDispatch } from "react-redux";
import { CommentType } from "../../Types/Comment.type";
import AddComment from "../../components/Comment/AddComment";

interface VideoCommentsProps {
	videoId: string;
}
const VideoComments: React.FC<VideoCommentsProps> = ({ videoId }) => {
	const [comments, setComments] = React.useState<CommentType[]>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currPath = React.useMemo<string[]>(() => [], []);
	const noOfcomments = 100;
	// console.log("videoId:", videoId);

	useEffect(() => {
		dispatch(clearComments());
	}, [videoId, dispatch]);

	useEffect(() => {
		if (!videoId) return;

		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/video/${videoId}`,
		}).then((commentsResponse: any) => { // eslint-disable-line
			const commentsData = commentsResponse.data?.comments || [];
			setComments(commentsData);

			dispatch(addComments({ childPathIds: currPath, childs: commentsData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		});
	}, [navigate, videoId, dispatch, currPath]);

	return (
		<div
			className="border-2 border-white py-2 rounded-lg 2lg:max-h-max max-h-[70vh] overflow-y-scroll my-4 px-2">
			<h1 className="text-white font-bold tracking-wide mb-2">
				{noOfcomments} Comments
			</h1>
			<AddComment avatarStyle="w-10" />

			{comments?.map((comment: CommentType) => (
				<CommentCard
					key={comment?._id}
					currPath={currPath.concat(comment?._id)}
					comment={comment}
					entityId={videoId}
					entityType="video"
				/>
			))}
		</div>
	);
};

export default VideoComments;

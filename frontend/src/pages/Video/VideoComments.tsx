import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import { useNavigate } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { addComments, deleteComment } from "../../context/slices/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { CommentType } from "../../Types/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { RootState } from "../../context/Store";
import { selectReplies } from "../Tweet/SelectReplies";
import { setCounter } from "../../context/slices/counterSlice";
import { formatNumber } from "../../utils/FormatNumber";
import { EditDeleteType } from "../../Types/EditDelete.type";
import DeleteVideoModal from "../../components/Popup/DeleteVideoModal";
interface VideoCommentsProps {
	videoId: string;
	noOfComments: number;
}

const VideoComments: React.FC<VideoCommentsProps> = ({ videoId, noOfComments }) => {
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });
	const currPath: string[] = [];
	const comments: CommentType[] = useSelector(
		(state: RootState) => selectReplies(state, currPath));
	const commentCount: number = useSelector((state: RootState) => state.counter.value);
	const commentCnt = formatNumber(commentCount);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const setShowDeleteModal = (value: boolean) => {
		if (value) { // delete Comment
			dispatch(deleteComment({ childPathIds: currPath }));
			setEditDeleteOption({ ...editDeleteOption, currentId: "", showDeleteModal: false });
		} else {
			setEditDeleteOption({ ...editDeleteOption, showDeleteModal: value });
		}
	};

	useEffect(() => {
		dispatch(setCounter({ value: noOfComments }));
	}, [noOfComments, dispatch]);

	useEffect(() => {
		if (!videoId || comments?.length) return;
		const userId = localStorage.getItem("userId");

		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/video/${videoId}${userId ? `?userId=${userId}` : ""}`,
		}).then((commentsResponse: any) => { // eslint-disable-line
			const commentsData = commentsResponse.data?.comments || [];

			if (commentsData.length === 0) return;
			dispatch(addComments({ childPathIds: [], childs: commentsData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		});
	}, [navigate, videoId, dispatch, comments.length]);

	return (<div className="border-2 border-primary-border py-2 rounded-lg 2lg:max-h-max max-h-[70vh] overflow-y-auto my-4 px-2">
		<h1 className="text-primary-text font-bold tracking-wide text-lg mb-2">
			{commentCnt} Comments
		</h1>
		<AddComment avatarStyle="w-10" entityType="video" entityId={videoId} currPath={currPath} />

		{editDeleteOption.showDeleteModal &&
			(<DeleteVideoModal Name="Comment"
				Url={`/api/v1/comments/${editDeleteOption.currentId}`}
				setShowDeleteModal={setShowDeleteModal}>
			</DeleteVideoModal>)
		}

		{comments?.map((comment: CommentType) => (
			<CommentCard
				key={comment?._id}
				currPath={currPath.concat(comment?._id)}
				comment={comment}
				entityId={videoId}
				entityType="video"
				editDeleteOption={editDeleteOption}
				setEditDeleteOption={setEditDeleteOption}>
			</CommentCard>)
		)}
	</div>);
};

export default VideoComments;

import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { addComments, clearComments, deleteComment } from "../../context/slices/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { CommentType } from "../../Types/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { formatNumber } from "../../utils/FormatNumber";
import { TweetType } from "../../Types/Tweet.type";
import { selectReplies } from "./SelectReplies";
import { RootState } from "../../context/Store";
import { setCounter } from "../../context/slices/counterSlice";
import { EditDeleteType } from "../../Types/EditDelete.type";
import DeleteVideoModal from "../../components/Popup/DeleteVideoModal";
import TweetDetailsInfo from "./TweetDetailsInfo";

const TweetDetails: React.FC = () => {
	const currPath: string[] = [];
	const comments: CommentType[] = useSelector(
		(state: RootState) => selectReplies(state, currPath));
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });
	const [tweet, setTweet] = React.useState<TweetType>();
	const { tweetId } = useParams<string>();
	const userId = localStorage.getItem("userId");
	const tweetNo = tweet?._id || "";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const noOfcomments = tweet?.comments;
	const commentCount = useSelector((state: RootState) => state.counter.value);
	const commentCnt = formatNumber(commentCount);

	const setShowDeleteModal = (value: boolean) => {
		if (value) { // delete Comment
			dispatch(deleteComment({ childPathIds: currPath }));
			setEditDeleteOption({ ...editDeleteOption, currentId: "", showDeleteModal: false });
		} else {
			setEditDeleteOption({ ...editDeleteOption, showDeleteModal: value });
		}
	};

	useEffect(() => {
		dispatch(clearComments());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setCounter({ value: noOfcomments }));
	}, [noOfcomments, dispatch]);

	useEffect(() => {
		if (comments.length) return;
		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/${"67509b2d90f1874c266f0644"}${userId ? `/${userId}` : ""}`, //tweetId
		}).then((tweetRes: any) => { // eslint-disable-line
			console.log("tweetRes", tweetRes);
			setTweet(tweetRes.data?.tweets?.[0]);

			// find details of current video
			return makeApiRequest({
				method: "get",
				url: `/api/v1/comments/tweet/${"67509b2d90f1874c266f0644"}${userId ? `?userId=${userId}` : ""}`,
			});
		}).then((commentsRes: any) => { // eslint-disable-line
			const commentsData = commentsRes.data?.comments || [];
			console.log("commentsData", commentsData);

			if (commentsData.length === 0) return;
			dispatch(addComments({ childPathIds: [], childs: commentsData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		})
	}, [tweetId, userId, navigate, dispatch, comments.length]);

	return (<div className="px-4 pt-4 mx-auto w-full max-w-6xl flex justify-items-center flex-col overflow-hidden">
		<TweetDetailsInfo tweetInfo={tweet} />

		<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4">
			<div className="text-primary-text font-bold text-xl">
				<h1>{commentCnt} Comments</h1>
			</div>
			<AddComment avatarStyle="w-11" entityType="tweet" entityId={tweetNo} currPath={currPath} />

			{editDeleteOption.showDeleteModal &&
				(<DeleteVideoModal Name="Comment"
					Url={`/api/v1/comments/${editDeleteOption.currentId}`}
					setShowDeleteModal={setShowDeleteModal}>
				</DeleteVideoModal>)
			}

			{comments?.map((comment: CommentType) => (
				<CommentCard
					key={comment._id}
					currPath={currPath.concat([comment._id])}
					comment={comment}
					entityId={tweetNo}
					entityType="tweet"
					editDeleteOption={editDeleteOption}
					setEditDeleteOption={setEditDeleteOption}>
				</CommentCard>
			))}
		</div>
	</div>);
};

export default TweetDetails;

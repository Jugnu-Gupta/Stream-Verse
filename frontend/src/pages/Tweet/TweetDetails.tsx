import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { addComments, clearComments, deleteComment } from "../../context/slices/Comment.slice";
import { useDispatch, useSelector } from "react-redux";
import { CommentType } from "../../Types/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { formatNumber } from "../../utils/FormatNumber";
import { TweetType } from "../../Types/Tweet.type";
import { selectReplies } from "./SelectReplies";
import { AppDispatch, RootState } from "../../context/store";
import { setCounter } from "../../context/slices/Counter.slice";
import { EditDeleteType } from "../../Types/EditDelete.type";
import DeleteModal from "../../components/Popup/DeleteModal";
import ChannelTweetList2 from "../Channel/Tweets/ChannelTweetList2";

const TweetDetails: React.FC = () => {
	const currPath: string[] = [];
	const comments: CommentType[] = useSelector(
		(state: RootState) => selectReplies(state, currPath));
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });
	const [tweet, setTweet] = React.useState<TweetType>();
	const { tweetId } = useParams<string>();
	const userId = localStorage.getItem("userId");
	const noOfcomments = tweet?.comments;
	const commentCount = useSelector(
		(state: RootState) => state.counter.value);
	const commentCnt = formatNumber(commentCount);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

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
		dispatch(setCounter({ value: noOfcomments || 0 }));
	}, [noOfcomments, dispatch]);

	useEffect(() => {
		if (comments.length) return;
		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/${tweetId}${userId ? `/${userId}` : ""}`,
		}).then((tweetRes: any) => { // eslint-disable-line
			setTweet(tweetRes.data?.tweets?.[0]);

			// find details of current video
			return makeApiRequest({
				method: "get",
				url: `/api/v1/comments/tweet/${tweetId}${userId ? `?userId=${userId}` : ""}`,
			});
		}).then((commentsRes: any) => { // eslint-disable-line
			const commentsData = commentsRes.data?.comments || [];

			if (commentsData.length === 0) return;
			dispatch(addComments({ childPathIds: [], childs: commentsData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
			navigate("/");
		})
	}, [tweetId, userId, navigate, dispatch, comments.length]);

	return (<div className="px-4 pt-4 mx-auto w-full max-w-6xl flex justify-items-center flex-col overflow-hidden">
		<ChannelTweetList2 tweetInfo={tweet} />

		<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4">
			<div className="text-primary-text font-bold text-xl">
				<h1>{commentCnt} Comments</h1>
			</div>
			<AddComment avatarStyle="w-11" entityType="tweet" entityId={tweetId || ""} currPath={currPath} />

			{editDeleteOption.showDeleteModal &&
				(<DeleteModal Name="Comment"
					Url={`/api/v1/comments/${editDeleteOption.currentId}`}
					setShowDeleteModal={setShowDeleteModal}>
				</DeleteModal>)
			}

			{comments?.map((comment: CommentType) => (
				<CommentCard
					key={comment._id}
					currPath={currPath.concat([comment._id])}
					comment={comment}
					entityId={tweetId || ""}
					entityType="tweet"
					editDeleteOption={editDeleteOption}
					setEditDeleteOption={setEditDeleteOption}>
				</CommentCard>
			))}
		</div>
	</div>);
};

export default TweetDetails;

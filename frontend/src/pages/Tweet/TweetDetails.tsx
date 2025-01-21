import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { addComments, clearComments, deleteComment } from "../../context/slices/Comment.slice";
import { useDispatch, useSelector } from "react-redux";
import { CommentType } from "../../type/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { formatNumber } from "../../utils/FormatNumber";
import { TweetType } from "../../type/Tweet.type";
import { selectReplies } from "./SelectReplies";
import { AppDispatch, RootState } from "../../context/store";
import { setCounter } from "../../context/slices/Counter.slice";
import { EditDeleteType } from "../../type/EditDelete.type";
import DeleteModal from "../../components/Popup/DeleteModal";
import ChannelTweetList2 from "../Channel/Tweets/ChannelTweetList2";
import NoResultsFound from "../Search/NoResultsFound";
import { usePagination } from "../../hooks/usePagination";
import loadingGIF from "../../assets/loading.gif";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";


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

	const setShowDeleteModal = (value: boolean, currPath: string[]) => {
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

	const getComments = (page: number, loading: boolean, hasMore: boolean, tweetId: string) => {
		if (loading || !hasMore) return;

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/tweet/${tweetId}`,
			params: { userId, page, limit: 10 }
		}).then((commentsRes) => {
			const commentsData = (commentsRes as ResponseType).data?.comments;

			setPage((prevPage) => prevPage + 1);
			setHasMore(commentsData.length > 0);
			if (commentsData.length === 0) return;
			dispatch(addComments({ childPathIds: [], childs: commentsData }));
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
			navigate("/");
		}).finally(() => {
			setLoading(false);
		});
	};
	const { setPage, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(getComments, tweetId || "");

	useEffect(() => {
		if (!tweetId) return;

		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/${tweetId}${userId ? `/${userId}` : ""}`,
		}).then((tweetRes) => {
			const tweetData = (tweetRes as ResponseType).data?.tweets?.[0];
			setTweet(tweetData);
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
			navigate("/");
		});
	}, [tweetId, userId, navigate]);

	return (<div className="px-4 pt-4 mx-auto w-full max-w-6xl flex justify-items-center flex-col overflow-hidden">
		<ChannelTweetList2 tweetInfo={tweet} />

		<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4">
			<div className="text-primary-text font-bold text-xl">
				<h1>{commentCnt} Comments</h1>
			</div>
			<AddComment avatarStyle="w-11" entityType="tweet" entityId={tweetId || ""} currPath={currPath} />

			{editDeleteOption.showDeleteModal &&
				(<DeleteModal Name="Comment"
					currPath={editDeleteOption.pathToCurId || []}
					Url={`/api/v1/comments/${editDeleteOption.currentId}`}
					setShowDeleteModal={setShowDeleteModal}>
				</DeleteModal>)
			}

			{comments?.length === 0 ?
				(!hasMore ? <NoResultsFound style="mt-0" entityName="comment"
					heading="No comments" message="This video has no comments, drop your below!" />
					: (<div className='w-full h-full flex justify-center items-center'>
						<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
					</div>)
				) : comments?.map((comment: CommentType) => (
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
			<div key={"lastItemRef"} ref={lastItemRef} className="h-1 mb-1 w-full bg-transparent"></div>
		</div>
	</div>);
};

export default TweetDetails;

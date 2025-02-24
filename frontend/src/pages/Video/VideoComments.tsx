import React, { useEffect } from "react";
import CommentCard from "../../components/Comment/CommentCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { addComments, clearComments, deleteComment }
	from "../../context/slices/Comment.slice";
import { useDispatch, useSelector } from "react-redux";
import { CommentType } from "../../type/Comment.type";
import AddComment from "../../components/Comment/AddComment";
import { AppDispatch, RootState } from "../../context/store";
import { selectReplies } from "../Tweet/SelectReplies";
import { setCounter } from "../../context/slices/Counter.slice";
import { formatNumber } from "../../utils/FormatNumber";
import { EditDeleteType } from "../../type/EditDelete.type";
import DeleteModal from "../../components/Popup/DeleteModal";
import NoResultsFound from "../Search/NoResultsFound";
import { usePagination } from "../../hooks/usePagination";
import loadingGIF from "../../assets/loading.gif";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";

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
	const commentCount: number = useSelector(
		(state: RootState) => state.counter.value);
	const commentCnt = formatNumber(commentCount);
	const dispatch = useDispatch<AppDispatch>();

	const setShowDeleteModal = (value: boolean, currPath: string[]) => {
		if (value) { // delete Comment
			dispatch(deleteComment({ childPathIds: currPath }));
			setEditDeleteOption({ ...editDeleteOption, currentId: "", pathToCurId: [], showDeleteModal: false });
		} else {
			setEditDeleteOption({ ...editDeleteOption, showDeleteModal: value });
		}
	};

	const getComments = (page: number, loading: boolean, hasMore: boolean, videoId: string) => {
		if (!videoId || loading || !hasMore) return;
		const userId = localStorage.getItem("userId");

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/video/${videoId}`,
			params: { page, limit: 10, userId }
		}).then((commentsResponse) => {
			const commentsData = (commentsResponse as ResponseType).data?.comments;

			setPage((prevPage) => prevPage + 1);
			setHasMore(commentsData.length > 0);
			if (commentsData.length === 0) return;
			dispatch(addComments({ childPathIds: [], childs: commentsData }));
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	};
	const { setPage, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(getComments, videoId);

	useEffect(() => {
		dispatch(setCounter({ value: noOfComments }));
	}, [noOfComments, dispatch]);

	useEffect(() => {
		dispatch(clearComments());
	}, [dispatch]);

	return (<div className="border-2 border-primary-border py-2 rounded-lg 2lg:max-h-max max-h-[70vh] overflow-y-auto my-4 px-2">
		<h1 className="text-primary-text font-bold tracking-wide text-lg mb-2">
			{commentCnt} Comments
		</h1>
		<AddComment avatarStyle="w-10" entityType="video" entityId={videoId} currPath={currPath} />

		{editDeleteOption.showDeleteModal &&
			(<DeleteModal Name="Comment"
				Url={`/api/v1/comments/${editDeleteOption.currentId}`}
				currPath={editDeleteOption.pathToCurId || []}
				setShowDeleteModal={setShowDeleteModal}>
			</DeleteModal>)
		}

		{comments?.length === 0 ?
			(!hasMore ? <NoResultsFound style="mt-0" entityName="comment"
				heading="No comments" message="This video has no comments, drop your below!" />
				: (<div className='w-full h-fit flex justify-center items-center'>
					<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
				</div>)
			) : comments?.map((comment: CommentType) => (
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
		<div key={"lastItemRef"} ref={lastItemRef} className="h-1 w-full bg-transparent"></div>
	</div>);
};

export default VideoComments;

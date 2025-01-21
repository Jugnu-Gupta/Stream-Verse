import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import makeApiRequest from "../../utils/MakeApiRequest";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import { addComments, updateComment } from "../../context/slices/Comment.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { CommentType } from "../../type/Comment.type";
import { selectReplies } from "../../pages/Tweet/SelectReplies";
import AddComment from "./AddComment";
import useLikeDislike from "../../hooks/useLikeDislike";
import { computeDislikeCount, computeLikeCount }
	from "../../utils/ComputeLikeDislikeCount";
import EditDeleteComment from "./EditDeleteComment";
import { EditDeleteWrapper } from "../../type/EditDelete.type";
import toast from "react-hot-toast";
import { usePagination } from "../../hooks/usePagination";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";
import { generateAvatar } from "../../utils/GenerateAvatar";

interface CommentProps extends EditDeleteWrapper {
	currPath: string[];
	entityId: string;
	entityType: string;
	comment: CommentType;
}
const CommentCard: React.FC<CommentProps> = ({ currPath, comment, entityId, entityType, editDeleteOption, setEditDeleteOption }) => {
	const replies: CommentType[] = useSelector((state: RootState) => selectReplies(state, currPath));
	const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike(
		{ entityId: comment?._id, entityType: "comment", likeStatus: comment?.likeStatus });
	const [commentText, setCommentText] = React.useState(comment?.content || "comment");
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [showReplies, setShowReplies] = React.useState(false);
	const dislikes = computeDislikeCount(comment?.dislikes, comment?.likeStatus, isDisliked);
	const likes = computeLikeCount(comment?.likes, comment?.likeStatus, isLiked);
	const [giveReply, setGiveReply] = React.useState(false);

	const UploadedAt = formatDateDistanceToNow(new Date(comment.createdAt));
	const channelUserName = "@" + (comment?.owner?.userName || "Channel User Name");
	const channelFullName = comment?.owner?.fullName || "Channel Full Name";
	const curUserName = localStorage.getItem("userName");
	const avatarUrl = comment?.owner?.avatar?.url || generateAvatar(channelFullName, "0078e1", "ffffffcc", 50);
	const dispatch = useDispatch<AppDispatch>();
	const commentId = comment?._id;
	const navigate = useNavigate();

	const getComments = (page: number, loading: boolean, hasMore: boolean, commentId: string) => {
		if (!entityId || !commentId || loading || !hasMore) return;
		const userId = localStorage.getItem("userId");

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/${entityType}/${entityId}/${commentId}`,
			params: { userId, page, limit: 10 }
		}).then((RepliesResponse) => {
			const RepliesData = (RepliesResponse as ResponseType).data?.comments;

			setPage((prevPage) => prevPage + 1);
			setHasMore(RepliesData.length > 0);
			dispatch(addComments({ childPathIds: currPath, childs: RepliesData }));
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	}

	const { page, setPage, loading, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(getComments, entityId);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "26px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [commentText]);

	useEffect(() => {
		getComments(page, loading, hasMore, commentId);
	}, [commentId]);

	const handleEditComment = () => {
		if (commentText.trim() === comment?.content || commentId === "") return;
		makeApiRequest({
			method: "patch",
			url: `/api/v1/comments/${commentId}`,
			data: {
				content: commentText.trim(),
			}
		}).then(() => {
			toast.success("Playlist updated successfully");
			setEditDeleteOption({ ...editDeleteOption, showEditModal: false });
			dispatch(updateComment({ childPathIds: currPath, content: commentText.trim() }));
			setCommentText(commentText.trim());
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		});
	}

	const discardChanges = () => {
		setEditDeleteOption({ ...editDeleteOption, showEditModal: false });
		setCommentText(comment?.content || "comment");
	}

	return (<div className="pt-2 overflow-hidden w-full">
		<div className="flex items-start gap-2 w-full">
			<div onClick={() => navigate(`/channel/${channelUserName}/videos`)}
				className="overflow-hidden rounded-full w-10">
				<img src={avatarUrl} alt="avatar" loading='lazy'
					className="rounded-full w-10 aspect-square"
				/>
			</div>
			<div className="flex flex-col text-primary-text overflow-hidden w-full">
				<div className="flex gap-2 items-center">
					<p className="text-sm font-semibold">{channelUserName}</p>
					<p className="text-primary-text2 text-xs">{UploadedAt} </p>
				</div>

				<div className="flex flex-col items-start my-2 text-sm">
					<textarea ref={textAreaRef}
						placeholder="Comment"
						className={twMerge("w-full bg-transparent resize-none outline-none border-primary-border overflow-hidden",
							(editDeleteOption.currentId === commentId && editDeleteOption.showEditModal) && "border-b-2"
						)}
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						readOnly={!(editDeleteOption.currentId === commentId && editDeleteOption.showEditModal)}
					/>
				</div>

				{!(editDeleteOption.currentId === commentId && editDeleteOption.showEditModal) ?
					(<div className="flex justify-start gap-3 font-semibold tracking-wide mb-2">
						<button onClick={handleLike}
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							{isLiked ? <BiSolidLike /> : <BiLike />}
							<span className="text-xs">{likes}</span>
						</button>
						<button onClick={handleDislike}
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							{isDisliked ? <BiSolidDislike /> : <BiDislike />}
							<span className="text-xs">{dislikes}</span>
						</button>
						<button onClick={() => setGiveReply(true)}
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							<span className="text-xs">Reply</span>
						</button>
					</div>) :
					(<div className="flex justify-end gap-1 font-semibold tracking-wide mb-0.5">
						<button onClick={discardChanges}
							className="text-sm outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							Cancel
						</button>
						<button onClick={handleEditComment}
							className={twMerge("text-sm outline-none bg-background-secondary px-2 py-1 rounded-xl duration-300",
								commentText.trim() === comment?.content && "opacity-50")}>
							Save
						</button>
					</div>)
				}

				{giveReply &&
					(<AddComment
						setGiveReply={setGiveReply}
						avatarStyle="w-7"
						entityType={entityType}
						entityId={entityId}
						parentId={commentId}
						currPath={currPath}>
					</AddComment>)
				}

				{replies?.length > 0 && (
					<button
						className="flex items-center gap-2 outline-none text-primary-text w-fit hover:bg-background-secondary px-2 mb-2 py-1 rounded-xl duration-300"
						onClick={() => setShowReplies(!showReplies)}>
						{showReplies ? <FaChevronUp /> : <FaChevronDown />}
						<span className="text-sm font-semibold tracking-wide">
							{replies?.length} {replies?.length === 1 ? "reply" : "replies"}
						</span>
					</button>
				)}
			</div>

			{channelUserName === `@${curUserName}` &&
				(<EditDeleteComment
					currPath={currPath}
					commentId={commentId}
					commentText={comment?.content}
					setCommentText={setCommentText}
					editDeleteOption={editDeleteOption}
					setEditDeleteOption={setEditDeleteOption}>
				</EditDeleteComment>)
			}
			<div ref={lastItemRef}></div>
		</div>

		{showReplies && (
			<div className={twMerge(
				"w-full h-full",
				currPath.length < 5 ? "pl-4" : "pl-0"
			)}>
				{replies?.map((reply: CommentType) =>
				(<CommentCard
					key={reply?._id}
					currPath={currPath.concat([reply?._id])}
					comment={reply}
					entityId={entityId}
					entityType={entityType}
					editDeleteOption={editDeleteOption}
					setEditDeleteOption={setEditDeleteOption}>
				</CommentCard >))
				}
			</div>
		)}
	</div>);
};

export default CommentCard;

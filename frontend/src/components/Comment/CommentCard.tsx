import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import makeApiRequest from "../../utils/MakeApiRequest";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { addComments } from "../../context/slices/CommentSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/Store";
import { CommentType } from "../../Types/Comment.type";
import { selectReplies } from "../../pages/Tweet/SelectReplies";
import AddComment from "./AddComment";
import useLikeDislike from "../../hooks/useLikeDislike";
import { computeDislikeCount, computeLikeCount }
	from "../../utils/ComputeLikeDislikeCount";

interface CommentProps {
	currPath: string[];
	entityId: string;
	entityType: string;
	comment: CommentType;
}

const CommentCard: React.FC<CommentProps> = ({ currPath, comment, entityId, entityType }) => {
	const replies: CommentType[] = useSelector((state: RootState) => selectReplies(state, currPath));
	const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike({ entityId: comment?._id, entityType: "comment", likeStatus: comment?.likeStatus });
	const [showReplies, setShowReplies] = React.useState(false);
	const dislikes = computeDislikeCount(comment?.dislikes, comment?.likeStatus, isDisliked);
	const likes = computeLikeCount(comment?.likes, comment?.likeStatus, isLiked);
	const [giveReply, setGiveReply] = React.useState(false);

	const UploadedAt = formatDateToNow(new Date(comment.createdAt));
	const channelName = "@" + (comment?.owner?.userName || "Channel Name");
	const description = comment?.content || "comment";
	const commentId = comment?._id;
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!entityId || !commentId || replies?.length) return;
		const userId = localStorage.getItem("userId");

		makeApiRequest({
			method: "get",
			url: `/api/v1/comments/${entityType}/${entityId}/${commentId}${userId ? `?userId=${userId}` : ""}`,
		}).then((RepliesResponse: any) => { // eslint-disable-line
			const RepliesData = RepliesResponse.data?.comments || [];

			dispatch(addComments({ childPathIds: currPath, childs: RepliesData }));
		}).catch((error) => {
			console.error("Error fetching data:", error);
		});
	}, [dispatch, entityType, entityId, commentId, replies, currPath]);

	return (
		<div className="pl-2 pt-2 overflow-hidden w-full">
			<div className="flex items-start gap-2 w-full">
				<Link to={`/${channelName.substring(1)}/videos`}>
					<div className="overflow-hidden rounded-full w-10">
						<img
							src={thumbnail}
							alt="thumbnail"
							className="rounded-full w-10 aspect-square"
						/>
					</div>
				</Link>
				<div className="flex flex-col text-primary-text overflow-hidden w-full">
					<div className="flex gap-2 items-center">
						<p className="text-sm font-semibold">{channelName}</p>
						<p className="text-primary-text2 text-xs">
							{UploadedAt}
						</p>
					</div>
					<div className="flex flex-col items-start my-2 text-sm">
						<p>{description}</p>
					</div>
					<div className="flex justify-start gap-3 font-semibold tracking-wide mb-2">
						<button
							onClick={handleLike}
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							{isLiked ? <BiSolidLike /> : <BiLike />}
							<span className="text-xs">{likes}</span>
						</button>
						<button
							onClick={handleDislike}
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							{isDisliked ? <BiSolidDislike /> : <BiDislike />}
							<span className="text-xs">{dislikes}</span>
						</button>
						<button
							className="flex items-center gap-1 text-xl outline-none hover:bg-background-secondary px-2 py-1 rounded-xl duration-300"
							onClick={() => setGiveReply(true)}>
							{/* <BiCommentDetail className="-scale-x-100" /> */}
							<span className="text-xs">Reply</span>
						</button>
					</div>

					{giveReply && <AddComment setGiveReply={setGiveReply} avatarStyle="w-7" />}

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
			</div>
			{showReplies && currPath.length < 10 && (
				<div
					className={twMerge(
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
					/>))
					}
				</div>
			)}
		</div>
	);
};

export default CommentCard;

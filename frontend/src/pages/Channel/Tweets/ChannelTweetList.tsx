import React, { useEffect } from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { formatDateToNow } from "../../../utils/FormatDateToNow";
import { formatNumber } from "../../../utils/FormatNumber";
import { TweetType } from "../../../Types/Tweet.type";
import useLikeDislike from "../../../hooks/useLikeDislike";
import { computeDislikeCount, computeLikeCount }
	from "../../../utils/ComputeLikeDislikeCount";
import { EditDeleteWrapper } from "../../../Types/EditDelete.type";
import EditDeleteTweet from "./EditDeleteTweet";
import toast from "react-hot-toast";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { twMerge } from "tailwind-merge";

interface ChannelTweetListProps extends EditDeleteWrapper {
	tweetInfo: TweetType | undefined;
}
const ChannelTweetList: React.FC<ChannelTweetListProps> = ({ tweetInfo, editDeleteOption, setEditDeleteOption }) => {
	const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike(
		{ entityId: tweetInfo?._id || "", entityType: "tweet", likeStatus: tweetInfo?.likeStatus });
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [readMore, setReadMore] = React.useState<boolean>(false);
	const UploadedAt = formatDateToNow(tweetInfo?.createdAt);
	const channelName = tweetInfo?.owner?.fullName || "channel Name";
	const dislikes = computeDislikeCount(tweetInfo?.dislikes, tweetInfo?.likeStatus, isDisliked);
	const likes = computeLikeCount(tweetInfo?.likes, tweetInfo?.likeStatus, isLiked);
	const comments = formatNumber(tweetInfo?.comments);

	const tweetId = tweetInfo?._id || "";
	const [description, setDescription] = React.useState<string>(tweetInfo?.content || "description");
	const [tweetText, setTweetText] = React.useState<string>(description);
	const showContent = (editDeleteOption.currentId === tweetId && editDeleteOption.showEditModal)
		? tweetText : (readMore || description.length <= 100 ? description : `${description.slice(0, 100)}...`);

	const handleEditTweet = () => {
		if (tweetText === "" || tweetId === "") return;
		makeApiRequest({
			method: "patch",
			url: `/api/v1/tweets/${tweetId}`,
			data: {
				content: tweetText
			}
		}).then(() => {
			toast.success("Tweet updated successfully");
			setEditDeleteOption({ ...editDeleteOption, showEditModal: false });
			setDescription(tweetText);
		}).catch((error) => {
			console.error("Error fetching data:", error);
		});
	};

	const handleEditClick = () => {
		setEditDeleteOption({ ...editDeleteOption, showEditModal: false });
		setTweetText(description);
	}

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "26px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [showContent]);

	return (<div className="flex items-start gap-2 p-2 w-full">
		<Link to={`/tweets/${tweetId}`}>
			<div className="overflow-hidden rounded-full w-10">
				<img src={thumbnail} alt="thumbnail"
					className="rounded-full w-10 aspect-square" />
			</div>
		</Link>
		<div className="flex flex-col text-primary-text w-full">
			<div className="flex gap-2 items-center mb-2">
				<p className="text-sm font-semibold">{channelName}</p>
				<p className="text-primary-text2 text-xs">{UploadedAt}</p>
			</div>
			<div className="flex flex-col items-start">
				<textarea onChange={(e) => setTweetText(e.target.value)}
					className="w-full h-8 pb-1 xs:text-sm overflow-hidden outline-none resize-none bg-transparent text-primary-text"
					placeholder="Add a tweet..."
					value={showContent}
					readOnly={!(editDeleteOption.currentId === tweetId && editDeleteOption.showEditModal)}
					ref={textAreaRef}>
				</textarea>
				{description.length > 100 && !(editDeleteOption.currentId === tweetId && editDeleteOption.showEditModal) && (
					<button
						onClick={() => setReadMore(!readMore)}
						className="text-sm text-primary-text font-semibold">
						{readMore ? "Show less" : "Read more"}
					</button>
				)}

			</div>
			{thumbnail && (
				<Link to={`/tweets/${tweetId}`}>
					<div className="overflow-hidden rounded-lg m-2 w-fit">
						<img src={thumbnail} alt="thumbnail"
							className="rounded-lg w-full aspect-auto" />
					</div>
				</Link>
			)}
			{editDeleteOption.currentId === tweetId && editDeleteOption.showEditModal ?
				<div className="flex justify-end gap-3 font-semibold tracking-wide">
					<button onClick={handleEditClick}
						className="text-sm hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
						Cancel
					</button>
					<button onClick={handleEditTweet}
						className={twMerge("text-sm bg-background-secondary px-2 py-1 rounded-xl duration-300", tweetText === "" && "opacity-75")}>
						Save
					</button>
				</div>
				:
				<div className="flex justify-start gap-3 font-semibold tracking-wide">
					<button onClick={handleLike}
						className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
						{isLiked ? <BiSolidLike /> : <BiLike />}
						<span className="text-xs">{likes}</span>
					</button>
					<button onClick={handleDislike}
						className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
						{isDisliked ? <BiSolidDislike /> : <BiDislike />}
						<span className="text-xs">{dislikes}</span>
					</button>
					<Link to="../../tweets/:tweetId">
						<button className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
							<BiCommentDetail className="-scale-x-100" />
							<span className="text-xs">{comments}</span>
						</button>
					</Link>
				</div>
			}
		</div>
		<EditDeleteTweet tweetId={tweetId}
			tweetText={description}
			setTweetText={setTweetText}
			editDeleteOption={editDeleteOption}
			setEditDeleteOption={setEditDeleteOption}>
		</EditDeleteTweet>
	</div>);
};

export default ChannelTweetList;

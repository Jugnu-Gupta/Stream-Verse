import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const ChannelTweetCommentList: React.FC = () => {
	const [readMore, setReadMore] = React.useState(false);
	const [isliked, setIsLiked] = React.useState(false);
	const [isDisliked, setIsDisliked] = React.useState(false);
	const [showReplies, setShowReplies] = React.useState(false);
	const UploadedAt = "1 month";
	const channelName = "Channel Name";
	const dislikes = 100;
	const likes = 100;
	const replies = [{ likes }];
	const [giveReply, setGiveReply] = React.useState(false);
	// store 100 words in description
	const description =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
	const desc = readMore ? description : `${description.slice(0, 100)}...`;

	const likeHanlder = () => {
		setIsLiked(!isliked);
		setIsDisliked(false);
	};
	const dislikeHanlder = () => {
		setIsDisliked(!isDisliked);
		setIsLiked(false);
	};

	return (
		<div className="flex items-start gap-2 p-2">
			<Link to="/register">
				<div className="overflow-hidden rounded-full w-10">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-full w-10 aspect-square"
					/>
				</div>
			</Link>
			<div className="flex flex-col text-white">
				<div className="flex gap-2 items-center">
					<p className="text-sm font-semibold">{channelName}</p>
					<p className="text-primary-text2 text-xs">{UploadedAt}</p>
				</div>
				<div className="flex flex-col items-start my-2">
					<p>{desc}</p>
					{description.length > 100 && (
						<button
							onClick={() => setReadMore(!readMore)}
							className="text-sm text-primary-text font-semibold">
							{readMore ? "Show less" : "Read more"}
						</button>
					)}
				</div>
				<div className="flex justify-start gap-3 font-semibold tracking-wide mb-2">
					<button
						onClick={likeHanlder}
						className="flex items-center gap-1 text-xl hover:bg-background-lightest px-2 py-1 rounded-xl duration-300">
						{isliked ? <BiSolidLike /> : <BiLike />}
						<span className="text-xs">{likes}</span>
					</button>
					<button
						onClick={dislikeHanlder}
						className="flex items-center gap-1 text-xl hover:bg-background-lightest px-2 py-1 rounded-xl duration-300">
						{isDisliked ? <BiSolidDislike /> : <BiDislike />}
						<span className="text-xs">{dislikes}</span>
					</button>
					<button
						className="flex items-center gap-1 text-xl hover:bg-background-lightest px-2 py-1 rounded-xl duration-300"
						onClick={() => setGiveReply(true)}>
						{/* <BiCommentDetail className="-scale-x-100" /> */}
						<span className="text-xs">Reply</span>
					</button>
				</div>

				{giveReply && (
					<div className="flex items-start w-full">
						<div className="overflow-hidden rounded-full w-10">
							{/* // current user image */}
							<img
								src={thumbnail}
								alt="thumbnail"
								className="rounded-full w-6 aspect-square"
							/>
						</div>
						<div className="text-white flex flex-col w-full items-end">
							<textarea
								className="bg-transparent outline-none border-2 rounded-lg border-white w-full mb-2 px-2 focus:resize-y resize-none min-h-8"
								placeholder="Add a comment..."
								rows={3}></textarea>
							<div className="flex gap-2">
								<button
									className="font-semibold hover:bg-background-lightest px-3 py-1 rounded-full duration-300"
									onClick={() => setGiveReply(false)}>
									Cancel
								</button>
								<button className="px-3 py-1 rounded-full bg-background-lightest opacity-50">
									Comment
								</button>
							</div>
						</div>
					</div>
				)}

				{replies.length > 0 && (
					<button
						className="flex items-center gap-2 text-primary2 w-fit hover:bg-background-lightest px-2 py-1 rounded-xl duration-300"
						onClick={() => setShowReplies(!showReplies)}>
						{showReplies ? <FaChevronUp /> : <FaChevronDown />}
						<span className="text-sm font-semibold tracking-wide">
							{replies.length} replies
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default ChannelTweetCommentList;

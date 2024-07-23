import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import ChannelTweetCommentList from "./ChannelTweetCommentList";
import ChannelTweetList from "./ChannelTweetList";
import { twMerge } from "tailwind-merge";

const ChannelTweetComment: React.FC = () => {
	const comments = 100;

	return (
		<div
			className={twMerge(
				"grid px-4 pt-4 w-full justify-items-center grid-cols-1"
			)}>
			<ChannelTweetList />
			<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4">
				<div className="text-white font-bold text-xl">
					<h1>{comments} Comments</h1>
				</div>
				<div className="flex gap-4 items-start w-full">
					<div className="overflow-hidden rounded-full w-10">
						{/* // current user image */}
						<img
							src={thumbnail}
							alt="thumbnail"
							className="rounded-full w-10 aspect-square"
						/>
					</div>
					<div className="text-white flex flex-col w-full items-end">
						<textarea
							className="bg-transparent outline-none border-2 rounded-lg border-white w-full mb-2 px-2 focus:resize-y resize-none min-h-8"
							placeholder="Add a comment..."
							rows={4}></textarea>
						<div className="flex gap-2">
							<button className="font-semibold hover:bg-background-lightest px-3 py-1 rounded-full duration-300">
								Cancel
							</button>
							<button className="px-3 py-1 rounded-full bg-background-lightest opacity-50">
								Comment
							</button>
						</div>
					</div>
				</div>
				<ChannelTweetCommentList />
				<ChannelTweetCommentList />
				<ChannelTweetCommentList />
			</div>
		</div>
	);
};

export default ChannelTweetComment;

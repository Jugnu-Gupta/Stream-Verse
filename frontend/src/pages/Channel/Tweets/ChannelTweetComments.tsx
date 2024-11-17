import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import ChannelTweetCommentList from "./ChannelTweetCommentList";
import ChannelTweetList from "./ChannelTweetList";
import { twMerge } from "tailwind-merge";

const ChannelTweetComments: React.FC = () => {
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [comment, setComment] = React.useState<string>("");
	const comments = 100;
	const currPath: number[] = [];

	React.useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "32px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [comment]);

	return (
		<div className="px-4 pt-4 w-full flex justify-items-center flex-col overflow-hidden">
			<ChannelTweetList />
			<div className="flex flex-col items-start gap-2 px-6 xs:px-2 w-full mt-4 max-w-5xl">
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
							className="w-full h-8 pb-1 border-b-2 mb-2 overflow-hidden outline-none resize-none bg-transparent"
							placeholder="Add a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							ref={textAreaRef}></textarea>
						<div className="flex gap-2">
							<button className="font-semibold hover:bg-background-secondary px-3 py-1 rounded-full duration-300">
								Cancel
							</button>
							<button
								className={twMerge(
									"px-3 py-1 rounded-full bg-primary font-semibold opacity-50",
									comment != "" && "opacity-100"
								)}>
								Comment
							</button>
						</div>
					</div>
				</div>
				<ChannelTweetCommentList currPath={currPath.concat([0])} />
				{/* <ChannelTweetCommentList />
				<ChannelTweetCommentList /> */}
			</div>
		</div>
	);
};

export default ChannelTweetComments;

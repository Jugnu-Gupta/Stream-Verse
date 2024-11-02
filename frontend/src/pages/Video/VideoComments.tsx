import React from "react";
import ChannelTweetCommentList from "../Channel/Tweets/ChannelTweetCommentList";
import { twMerge } from "tailwind-merge";
import useWindowWidth from "../../hooks/useWindowWidth";

const VideoComments: React.FC = () => {
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [comment, setComment] = React.useState<string>("");
	const windowWidth = useWindowWidth();
	const currPath: number[] = [];
	const comments = 100;

	React.useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "32px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [comment]);

	return (
		<div
			className={twMerge(
				"border-2 border-white py-2 rounded-lg mt-4",
				windowWidth < 800 && "max-h-[50vh] overflow-y-scroll mb-4"
			)}>
			<h1 className="text-white font-bold tracking-wide mb-2 px-2">
				{comments} Comments
			</h1>
			<div className="text-white flex flex-col w-full items-end px-2">
				<textarea
					value={comment}
					ref={textAreaRef}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment..."
					className="w-full h-8 pb-1 border-b-2 mb-2 overflow-hidden outline-none resize-none bg-transparent"></textarea>

				<div className="flex gap-2">
					<button className="font-semibold hover:bg-background-lightest px-3 py-1 rounded-full duration-300">
						Cancel
					</button>
					<button className="px-3 py-1 rounded-full bg-background-lightest opacity-50">
						Comment
					</button>
				</div>
			</div>

			<ChannelTweetCommentList currPath={currPath.concat([0])} />
		</div>
	);
};

export default VideoComments;

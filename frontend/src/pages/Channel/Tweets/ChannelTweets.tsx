import React from "react";
import ChannelTweetList from "./ChannelTweetList";
import thumbnail from "../../../assets/thumbnail.png";
import { IoImageOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useParams } from "react-router-dom";

const ChannelTweets: React.FC = () => {
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [selectedImage, setSelectedImage] = React.useState<string>("");
	const [comment, setComment] = React.useState<string>("");
	const { adminName } = useParams<{ adminName: string }>();
	// const url = window.location.href;
	const channelAdmin = "@admin";
	// console.log(adminName);
	// console.log(channelAdmin);

	React.useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "32px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [comment]);

	return (
		<div className="px-4 pt-4 mx-auto w-full max-w-6xl flex justify-center flex-col gap-4">

			{/* Add Tweets */}
			<div className={twMerge("text-white flex flex-col w-full items-end px-4 py-2 bg-background-secondary rounded-xl border-[1px] pt-1",
				adminName !== channelAdmin && "hidden")}>

				<div className="flex items-center gap-2 w-full py-2">
					<div className="overflow-hidden rounded-full w-9">
						<img
							src={thumbnail}
							alt="thumbnail"
							className="rounded-full w-10 aspect-square"
						/>
					</div>
					<div className="text-white overflow-hidden">
						<p className="text-sm font-semibold">{adminName}</p>
					</div>
				</div>

				<textarea
					className="w-full h-8 pb-1 mb-2 overflow-hidden outline-none resize-none bg-transparent"
					placeholder="Add a tweet..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					ref={textAreaRef}>
				</textarea>

				{selectedImage && (
					<div className="w-full mb-3">
						<img
							src={selectedImage}
							alt="selected"
							className="w-full h-full object-cover rounded-xl"
						/>
					</div>
				)}

				<div className="flex justify-between w-full">
					<div className="w-fit text-white">
						<label
							htmlFor="image-upload"
							className="bg-primary flex gap-2 items-center px-3 py-1 rounded-2xl cursor-pointer">
							<IoImageOutline className="text-lg" />
							<span>Image</span>
						</label>

						<input
							type="file"
							id="image-upload"
							name="image"
							accept="image/png"
							className="hidden"
							onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files![0]))}
						/>
					</div>
					<div className="flex gap-2">
						<button className="font-semibold hover:bg-background-primary px-3 py-1 rounded-full duration-300">
							Cancel
						</button>
						<button
							className={twMerge(
								"px-3 py-1 rounded-full bg-primary font-semibold opacity-70",
								(comment != "" || selectedImage) && "opacity-100"
							)}>
							Comment
						</button>
					</div>
				</div>
			</div>

			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
		</div>
	);
};

export default ChannelTweets;

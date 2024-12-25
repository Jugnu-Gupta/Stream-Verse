import React, { useEffect } from "react";
import ChannelTweetList from "./ChannelTweetList";
import thumbnail from "../../../assets/thumbnail.png";
import { IoImageOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { updateImage } from "../../../utils/UpdateImage";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { TweetType } from "../../../Types/Tweet.type";
import { ChannelInfoType } from "../../../Types/Channel.type";

interface ChannelInfoWrapper {
	channelInfo: ChannelInfoType;
}
const ChannelTweets: React.FC = () => {
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const [newTweetImage, setNewTweetImage] = React.useState<string>("");
	const [addCommentText, setAddCommentText] = React.useState<string>("");
	const channelName = channelInfo?.fullName || "Channel Name";
	const { adminName } = useParams<{ adminName: string }>();
	const channelId = channelInfo?._id;
	const curUserName = "@" + localStorage.getItem("userName");
	const [tweets, setTweets] = React.useState<TweetType[]>([]);
	const userId = localStorage.getItem("userId") || "";
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!channelId) return;
		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/user/${channelId}${userId ? `/${userId}` : ""}`,
		}).then((response: any) => { // eslint-disable-line
			console.log("channelsResponse tweets:", response.data);
			setTweets(response.data?.tweets);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		});
	}, [navigate, channelId, userId]);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "32px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [addCommentText]);

	return (
		<div className="px-6 xs:px-2 pt-4 mx-auto w-full max-w-6xl flex flex-col gap-4">

			{/* Add Tweets */}
			<div className={twMerge("text-white flex flex-col w-full items-end px-3 xs:px-2 pt-1 pb-2 bg-background-tertiary rounded-xl border-2 border-primary-border",
				adminName !== curUserName && "hidden")}>

				<div className="flex items-center gap-2 w-full pt-1 pb-2 xs:pt-0.5">
					<div className="overflow-hidden rounded-full w-9">
						<img
							src={thumbnail}
							alt="thumbnail"
							className="rounded-full w-10 aspect-square"
						/>
					</div>
					<div className="text-primary-text overflow-hidden">
						<p className="text-sm xs:text-sm font-semibold">{channelName}</p>
					</div>
				</div>

				<textarea
					className="w-full h-8 pb-1 xs:text-sm  overflow-hidden outline-none resize-none bg-transparent text-primary-text"
					placeholder="Add a tweet..."
					value={addCommentText}
					onChange={(e) => setAddCommentText(e.target.value)}
					ref={textAreaRef}>
				</textarea>

				{newTweetImage && (
					<div className="w-full mb-3">
						<img
							src={newTweetImage}
							alt="selected"
							className="w-full h-full object-cover rounded-xl"
						/>
					</div>
				)}

				<div className="flex justify-between w-full">
					<div className="w-fit text-primary-text">
						<label
							htmlFor="image-upload"
							className="bg-primary flex gap-2 xs:gap-1 items-center px-3 py-1 rounded-2xl cursor-pointer">
							<IoImageOutline className="text-lg xs:text-base text-primary-icon" />
							<span className="xs:text-sm text-primary-text">Image</span>
						</label>

						<input
							type="file"
							id="image-upload"
							name="image"
							accept="image/png,image/jpeg"
							className="hidden"
							onChange={(e) => updateImage(e, setNewTweetImage, 1024 * 1024)}
						/>
					</div>
					<div className="flex gap-2 xs:gap-1">
						<button className="font-semibold text-primary-text xs:text-sm hover:bg-primary px-3 py-1 rounded-full duration-300">
							Cancel
						</button>
						<button
							className={twMerge(
								"px-3 py-1 rounded-full text-primary-text bg-primary xs:text-sm font-semibold opacity-75",
								(addCommentText != "" || newTweetImage) && "opacity-100"
							)}>
							Tweet
						</button>
					</div>
				</div>
			</div>

			{/* Tweets */}
			<div>
				{tweets?.map((tweet: TweetType) => (
					<ChannelTweetList key={tweet._id} tweetInfo={tweet} />
				))}
			</div>
		</div>
	);
};

export default ChannelTweets;

import React, { useEffect } from "react";
import ChannelTweetList from "./ChannelTweetList";
import thumbnail from "../../../assets/thumbnail.png";
import { IoImageOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { TweetType } from "../../../Types/Tweet.type";
import { ChannelInfoType } from "../../../Types/Channel.type";
import { EditDeleteType } from "../../../Types/EditDelete.type";
import { BASE_URL } from "../../../Constants";
import { useImage } from "../../../hooks/useImage";
import DeleteVideoModal from "../../../components/Popup/DeleteVideoModal";
import toast from "react-hot-toast";
import axios from "axios";

interface ChannelInfoWrapper {
	channelInfo: ChannelInfoType;
}
const ChannelTweets: React.FC = () => {
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });
	const [addTweetText, setAddTweetText] = React.useState<string>("");
	const { fileInputRef, imagePreview, newTweetImage, setNewTweetImage, setImagePreview,
		handleImageChange, handleCancelClick } = useImage(setAddTweetText);
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const channelName = channelInfo?.fullName || "Channel Name";
	const { adminName } = useParams<{ adminName: string }>();
	const channelId = channelInfo?._id;
	const curUserName = "@" + localStorage.getItem("userName");
	const [tweets, setTweets] = React.useState<TweetType[]>([]);
	const userId = localStorage.getItem("userId") || "";
	const navigate = useNavigate();

	const setShowDeleteModal = (value: boolean) => {
		if (value) { // delete tweet
			setTweets(prev => prev.filter((tweet) => tweet._id !== editDeleteOption.currentId));
			setEditDeleteOption({ ...editDeleteOption, currentId: "", showDeleteModal: false });
		} else {
			setEditDeleteOption({ ...editDeleteOption, showDeleteModal: value });
		}
	};

	const handleCreateTweet = () => {
		if (addTweetText === "") return;

		const formData = new FormData(); // supports multipart/form-data or binary data
		formData.append("content", addTweetText);
		if (newTweetImage)
			formData.append("image", newTweetImage);

		const token = localStorage.getItem("accessToken");
		axios.post(`${BASE_URL}/api/v1/tweets`, formData,
			{
				headers: {
					"Content-Type": "multiform/form-data",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => {
				const responseData = response.data.data;
				console.log("response:", responseData);
				const avatar = localStorage.getItem("avatar");
				const newTweet: TweetType = {
					_id: responseData._id,
					content: responseData.content,
					likeStatus: 0,
					likes: 0,
					dislikes: 0,
					comments: 0,
					image: responseData?.image,
					owner: {
						_id: userId,
						fullName: channelName,
						userName: curUserName.substring(1),
						avatar: avatar ? JSON.parse(avatar) : null
					},
					createdAt: responseData.createdAt,
					updatedAt: responseData.updatedAt
				}
				setTweets([newTweet, ...tweets]);
				toast.success("Tweet created successfully");
				setAddTweetText("");
				setNewTweetImage(null);
				setImagePreview("");
			}).catch((error) => {
				console.error("Error fetching data:", error);
			});
	}

	useEffect(() => {
		if (!channelId) return;

		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/user/${channelId}${userId ? `/${userId}` : ""}`,
		}).then((response: any) => { // eslint-disable-line
			console.log("channelsResponse tweets:", response.data);
			setTweets(response.data?.tweets);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			navigate("/");
		});
	}, [navigate, channelId, userId]);

	useEffect(() => {
		if (textAreaRef.current) {
			textAreaRef.current!.style.height = "32px";
			const scrollHeight = textAreaRef.current!.scrollHeight;
			textAreaRef.current!.style.height = `${scrollHeight}px`;
		}
	}, [addTweetText]);

	return (
		<div className="px-6 xs:px-2 pt-4 mx-auto w-full max-w-6xl flex flex-col gap-4">
			{/* Add Tweets */}
			<div className={twMerge("text-white flex flex-col w-full items-end px-3 xs:px-2 pt-1 pb-2 bg-background-tertiary rounded-xl border-2 border-primary-border",
				adminName !== curUserName && "hidden")}>

				<div className="flex items-center gap-2 w-full pt-1 pb-2 xs:pt-0.5">
					<div className="overflow-hidden rounded-full w-9">
						<img src={thumbnail}
							alt="thumbnail"
							className="rounded-full w-10 aspect-square"
						/>
					</div>
					<div className="text-primary-text overflow-hidden">
						<p className="text-sm xs:text-sm font-semibold">{channelName}</p>
					</div>
				</div>

				<textarea onChange={(e) => setAddTweetText(e.target.value)}
					className="w-full h-8 pb-1 xs:text-sm  overflow-hidden outline-none resize-none bg-transparent text-primary-text"
					placeholder="Add a tweet..."
					value={addTweetText}
					ref={textAreaRef}>
				</textarea>

				{imagePreview && (
					<div className="w-full mb-3">
						<img src={imagePreview}
							alt="selected"
							className="w-full h-full object-cover rounded-xl"
						/>
					</div>
				)}

				<div className="flex justify-between w-full">
					<div className="w-fit text-primary-text">
						<label htmlFor="image-upload"
							className="bg-primary flex gap-2 xs:gap-1 items-center px-3 py-1 rounded-2xl cursor-pointer">
							<IoImageOutline className="text-lg xs:text-base text-primary-icon" />
							<span className="xs:text-sm text-primary-text">Image</span>
						</label>

						< input type="file"
							ref={fileInputRef}
							id="image-upload"
							name="image"
							accept="image/png,image/jpeg"
							className="hidden"
							onChange={(e) => handleImageChange(e, 1024 * 1024)}
						/>
					</div>
					<div className="flex gap-2 xs:gap-1">
						<button onClick={handleCancelClick}
							className="font-semibold text-primary-text xs:text-sm hover:bg-primary px-3 py-1 rounded-full duration-300">
							Cancel
						</button>
						<button className={twMerge("px-3 py-1 rounded-full text-primary-text bg-primary xs:text-sm font-semibold opacity-75",
							(addTweetText != "" || newTweetImage) && "opacity-100")}
							onClick={handleCreateTweet}>
							Tweet
						</button>
					</div>
				</div>
			</div>

			{editDeleteOption.showDeleteModal &&
				(<DeleteVideoModal Name="Tweet"
					Url={`/api/v1/tweets/${editDeleteOption.currentId}`}
					setShowDeleteModal={setShowDeleteModal}>
				</DeleteVideoModal>)
			}

			{/* Tweets */}
			<div>
				{tweets?.map((tweet: TweetType) => (
					<ChannelTweetList key={tweet._id}
						tweetInfo={tweet}
						editDeleteOption={editDeleteOption}
						setEditDeleteOption={setEditDeleteOption}>
					</ChannelTweetList>
				))}
			</div>
		</div>
	);
};

export default ChannelTweets;

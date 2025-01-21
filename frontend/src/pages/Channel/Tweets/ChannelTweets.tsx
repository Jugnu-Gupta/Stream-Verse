import React, { useEffect } from "react";
import ChannelTweetList from "./ChannelTweetList";
import { IoImageOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import makeApiRequest, { makeApiMediaRequest } from "../../../utils/MakeApiRequest";
import { TweetType } from "../../../type/Tweet.type";
import { ChannelInfoType } from "../../../type/Channel.type";
import { EditDeleteType } from "../../../type/EditDelete.type";
import { useMedia } from "../../../hooks/useMedia";
import DeleteModal from "../../../components/Popup/DeleteModal";
import toast from "react-hot-toast";
import NoResultsFound from "../../Search/NoResultsFound";
import ChannelTweetList2 from "./ChannelTweetList2";
import loadingGIF from "../../../assets/loading.gif";
import { ErrorType } from "../../../type/Error.type";
import { ResponseType } from "../../../type/Response.type";
import { generateAvatar } from "../../../utils/GenerateAvatar";
interface ChannelInfoWrapper {
	channelInfo: ChannelInfoType;
}
const ChannelTweets: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });
	const [addTweetText, setAddTweetText] = React.useState<string>("");
	const { fileInputRef, mediaPreview, newMedia, handleMediaChange, discardMediaChange } =
		useMedia();
	const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
	const channelName = channelInfo.fullName;
	const { adminName } = useParams<{ adminName: string }>();
	const channelId = channelInfo?._id;
	const curUserName = "@" + localStorage.getItem("userName");
	const [tweets, setTweets] = React.useState<TweetType[]>([]);
	const userId = localStorage.getItem("userId") || "";
	const avatarInfo = localStorage.getItem("avatar");
	const avatar = avatarInfo ? JSON.parse(avatarInfo) : null;
	const avatarUrl = avatar?.url || generateAvatar(channelName, "0078e1", "ffffffcc", 50);
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
		if (addTweetText.trim() === "") return;

		const data = new FormData();
		data.append("content", addTweetText.trim());
		if (newMedia) data.append("image", newMedia);

		makeApiMediaRequest({
			method: "post",
			url: `/api/v1/tweets`,
			data
		}).then((response) => {
			const data = (response as ResponseType).data;
			const newTweet: TweetType = {
				_id: data._id,
				content: data.content,
				likeStatus: 0,
				likes: 0,
				dislikes: 0,
				comments: 0,
				image: data?.image,
				owner: {
					_id: userId,
					fullName: channelName,
					userName: curUserName.substring(1),
					avatar: avatarInfo ? JSON.parse(avatarInfo) : null
				},
				createdAt: data.createdAt,
				updatedAt: data.updatedAt
			}
			setTweets([newTweet, ...tweets]);
			toast.success("Tweet created successfully");
			discardMediaChange(setAddTweetText);
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		});
	}

	useEffect(() => {
		if (!channelId) return;

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/tweets/user/${channelId}${userId ? `/${userId}` : ""}`,
		}).then((response) => {
			const data = (response as ResponseType).data;
			setTweets(data?.tweets.reverse());
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
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
						<img src={avatarUrl} alt="avatar" loading='lazy'
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

				{mediaPreview && (
					<div className="w-full mb-3">
						<img src={mediaPreview} alt="selected" loading='lazy'
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
							onChange={(e) => handleMediaChange(e, 1)}
						/>
					</div>
					<div className="flex gap-2 xs:gap-1">
						<button onClick={() => discardMediaChange(setAddTweetText)}
							className="font-semibold text-primary-text xs:text-sm hover:bg-primary px-3 py-1 rounded-full duration-300">
							Cancel
						</button>
						<button className={twMerge("px-3 py-1 rounded-full text-primary-text bg-primary xs:text-sm font-semibold",
							(addTweetText.trim() !== "" || newMedia) ? "opacity-100" : "opacity-50")}
							onClick={handleCreateTweet}>
							Tweet
						</button>
					</div>
				</div>
			</div>

			{editDeleteOption.showDeleteModal &&
				(<DeleteModal Name="Tweet"
					currPath={[]}
					Url={`/api/v1/tweets/${editDeleteOption.currentId}`}
					setShowDeleteModal={setShowDeleteModal}>
				</DeleteModal>)
			}

			{/* Tweets */}
			<div>
				{tweets.length === 0 ?
					(!loading ? <NoResultsFound entityName="tweet" style="mt-16"
						heading="No tweets" message="This channel has yet to make a Tweet." />
						: (<div className='w-full h-full flex justify-center items-center'>
							<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
						</div>))
					: tweets?.map((tweet: TweetType) => (
						adminName !== curUserName ?
							<ChannelTweetList key={tweet._id}
								tweetInfo={tweet}
								editDeleteOption={editDeleteOption}
								setEditDeleteOption={setEditDeleteOption}>
							</ChannelTweetList>
							: <ChannelTweetList2 key={tweet._id} tweetInfo={tweet} />
					))
				}
			</div>
		</div>
	);
};

export default ChannelTweets;

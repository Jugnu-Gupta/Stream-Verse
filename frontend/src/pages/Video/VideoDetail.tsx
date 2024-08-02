import React from "react";
import videoplayback from "../../assets/videoplayback.mp4";
import thumbnail from "../../assets/thumbnail.png";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import VideoComments from "./VideoComments";
import VideoListView from "./VideoList";
import useWindowWidth from "../../hooks/useWindowWidth";

const VideoDetail: React.FC = () => {
	const windowWidth = useWindowWidth();
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const [readMore, setReadMore] = React.useState(false);
	const [isliked, setIsLiked] = React.useState(false);
	const [isDisliked, setIsDisliked] = React.useState(false);
	const like = 100;
	const dislike = 100;
	const views = 100;
	const uploadedAt = "1 day";
	const Subscribers = 100;
	const description =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.";

	return (
		<div
			className={twMerge(
				windowWidth <= 766
					? "flex flex-col justify-start w-full px-2 mt-4"
					: windowWidth < 1000
					? "flex items-start gap-2 px-2"
					: "flex items-start gap-4 px-4"
			)}>
			<div
				className={twMerge(
					"flex flex-col",
					windowWidth <= 766 ? "w-full" : "w-2/3"
				)}>
				{/* video */}
				<video
					src={videoplayback}
					controls
					className={twMerge(windowWidth <= 766 && "px-2")}></video>

				{/* Description */}
				<div
					className={twMerge(
						"border-2 border-white rounded-lg p-2 mt-4",
						windowWidth <= 766 && "mx-2"
					)}>
					<div className="flex items-center justify-between mb-2">
						<div className="text-white">
							<h1 className="text-lg font-bold tracking-wide">
								Video Title
							</h1>
							<p className="text-sm">
								{views} · {uploadedAt}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap justify-between items-center">
						<div className="flex items-center gap-2">
							<img
								src={thumbnail}
								alt="thumbnail"
								className="rounded-full w-10 h-10 aspect-square"
							/>
							<div className="text-white">
								<h1 className="font-semibold">Channel Name</h1>
								<p className="text-sm">
									{Subscribers} Subscribers
								</p>
							</div>
						</div>
						<button
							onClick={() => setIsSubscribed(!isSubscribed)}
							className={twMerge(
								"bg-primary text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary2 duration-300",
								isSubscribed && "bg-opacity-75"
							)}>
							{isSubscribed ? "Subscribed" : "Subscribe"}
						</button>
						<div className="border-2 border-white rounded-lg w-fit flex items-center px-2 my-2">
							<button
								onClick={() => setIsLiked(!isliked)}
								className="flex items-center gap-2 text-white border-r-2 pr-2">
								{isliked ? <BiSolidLike /> : <BiLike />}
								{like}
							</button>
							<button
								onClick={() => setIsDisliked(!isDisliked)}
								className="flex items-center gap-2 text-white pl-2">
								{isDisliked ? (
									<BiSolidDislike />
								) : (
									<BiDislike />
								)}
								{dislike}
							</button>
						</div>
						<button className="relative group">
							<div className="flex items-center gap-1 relative rounded-md bg-white px-4 py-1 text-black ">
								<HiOutlineFolderAdd className="text-xl" />
								<span>Save</span>
							</div>

							{/* Create Playlist */}
							<div className="absolute -z-10 group-focus-within:z-10 p-4 rounded-lg bg-background text-white top-full right-0 shadow-[0_1px_2px_white]">
								<h3 className="text-sm font-semibold text-nowrap">
									Save to playlist
								</h3>

								{/* your playlists */}
								<div className="text-xs flex flex-col gap-2 pt-4">
									<div className="flex items-center capitalize">
										<input
											type="checkbox"
											id="playlist1"
											className="mr-2"
										/>
										<label htmlFor="playlist1">
											playlist1
										</label>
									</div>
									<div className="flex items-center capitalize">
										<input
											type="checkbox"
											id="playlist2"
											className="mr-2"
										/>
										<label htmlFor="playlist2">
											playlist2
										</label>
									</div>
									<div className="flex items-center capitalize">
										<input
											type="checkbox"
											id="playlist3"
											className="mr-2"
										/>
										<label htmlFor="playlist3">
											playlist3
										</label>
									</div>
								</div>

								{/* Add playlist */}
								<div className="w-full text-xs mt-3">
									<h3 className="text-start mb-1">Name</h3>
									<input
										type="text"
										className="rounded-md p-1 mb-1 outline-none text-black"
										placeholder="Enter playlist name"
									/>
									<button className="bg-primary text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md mt-2">
										Create a Playlist
									</button>
								</div>
							</div>
						</button>
					</div>
					<div className="w-full bg-white border-b-2 my-3"></div>

					<div className="text-white">
						<p className="text-sm">
							{readMore
								? description
								: description.slice(0, 100) + "..."}
						</p>
						<button
							onClick={() => setReadMore(!readMore)}
							className="text-primary2 text-sm">
							{readMore ? "Read Less" : "Read More"}
						</button>
					</div>
				</div>

				{/* Comments */}
				<VideoComments />
			</div>
			<div
				className={twMerge(
					"flex flex-col",
					windowWidth <= 766 ? "w-full" : "w-1/3"
				)}>
				{/* Related Videos */}
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
			</div>
		</div>
	);
};

export default VideoDetail;

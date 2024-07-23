import React, { useEffect } from "react";
import Background from "../../../assets/thumbnail.png";
import { useParams, Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ChannelHeader: React.FC = () => {
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const [page, setPage] = React.useState<string>("videos");
	const { userName } = useParams<{ userName: string }>();
	const url = window.location.href;
	const title = "Channel Title";
	const subscribers = "1000k";
	const videos = "100";

	console.log(url);
	useEffect(() => {
		let path: string | undefined = url.split("/").pop();
		if (
			path === "videos" ||
			path === "playlists" ||
			path === "tweets" ||
			path === "subscribed"
		)
			setPage(path);
		path = url.split("/")?.[url.split("/").length - 2];
		if (path === "tweets") setPage(path);
	}, [url]);

	return (
		<div className="flex flex-col px-6 xs:px-2 w-full">
			<div className="w-full">
				<img
					src={Background}
					alt="Background"
					className="w-full aspect-[5] rounded-lg"
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex mt-4 gap-4 items-center">
					<div>
						<img
							src={Background}
							alt="Background"
							className="w-28 xs:w-24 aspect-square rounded-full"
						/>
					</div>
					<div className="text-primary-text xs:text-sm">
						<h1 className="text-white font-bold text-3xl pb-1 xs:text-xl">
							{title}
						</h1>
						<p className="pb-1">{userName}</p>
						<p>
							{subscribers} subscribers · {videos} videos
						</p>
					</div>
				</div>
				<div>
					<button
						onClick={() => setIsSubscribed(!isSubscribed)}
						className={twMerge(
							"bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary2 duration-300",
							isSubscribed && "bg-opacity-75"
						)}>
						{isSubscribed ? "Subscribed" : "Subscribe"}
					</button>
				</div>
			</div>

			<nav className="bg-background flex justify-between text-center xs:text-sm mt-4 text-primary-text2 font-semibold">
				<Link
					to="/:userName/videos"
					className="w-full"
					onClick={() => setPage("videos")}>
					<h3
						className={twMerge(
							"px-2 py-1 duration-300",
							page === "videos" &&
								"bg-white rounded-md text-primary2"
						)}>
						Videos
					</h3>
				</Link>
				<Link
					to="/:userName/playlists"
					className="w-full"
					onClick={() => setPage("playlists")}>
					<h3
						className={twMerge(
							"px-2 py-1 duration-300",
							page === "playlists" &&
								"bg-white rounded-md text-primary2"
						)}>
						Playlists
					</h3>
				</Link>
				<Link
					to="/:userName/tweets"
					className="w-full"
					onClick={() => setPage("tweets")}>
					<h3
						className={twMerge(
							"px-2 py-1 duration-300",
							page === "tweets" &&
								"bg-white rounded-md text-primary2"
						)}>
						Tweets
					</h3>
				</Link>
				<Link
					to="/:userName/subscribed"
					className="w-full"
					onClick={() => setPage("subscribed")}>
					<h3
						className={twMerge(
							"px-2 py-1 duration-300",
							page === "subscribed" &&
								"bg-white rounded-md text-primary2"
						)}>
						Subscribed
					</h3>
				</Link>
			</nav>
		</div>
	);
};

export default ChannelHeader;

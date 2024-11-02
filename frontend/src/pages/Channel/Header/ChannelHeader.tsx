import React, { useEffect } from "react";
import Background from "../../../assets/thumbnail.png";
import { useParams, Link, useNavigate } from "react-router-dom";
import CHANNELNavItems from "../../../Constants/ChannelNavbar";
import { twMerge } from "tailwind-merge";

const ChannelHeader: React.FC = () => {
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const [page, setPage] = React.useState<string>("videos");
	const { adminName } = useParams<{ adminName: string }>();
	const navigate = useNavigate();
	const channelAdmin: string = "@admin";
	const url = window.location.href;
	const title = "Channel Title";
	const subscribers = "100k";
	const videos = "100";

	useEffect(() => {
		const path: string | undefined = url.split("/").pop();
		const validPaths: string[] = ["videos", "playlists", "tweets", "subscribed"];

		if (path && validPaths.includes(path)) {
			setPage(path);
		}
	}, [url]);

	return (
		<div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
			<div className="w-full">
				<img
					src={Background}
					alt="Background"
					className="w-full aspect-[5] rounded-2xl object-cover"
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex mt-4 gap-4 items-center w-fit mr-2">
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
						<p className="pb-1">{adminName}</p>
						<p>
							{subscribers} subscribers · {videos} videos
						</p>
					</div>
				</div>

				<div className="flex flex-wrap justify-end w-fit">
					<button
						onClick={() => navigate(`/${adminName}/dashboard`)}
						className={twMerge("bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300", adminName != channelAdmin && "hidden")}>
						Dashboard
					</button>
					<button
						onClick={() => setIsSubscribed(!isSubscribed)}
						className={twMerge(
							"bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300 ml-2",
							isSubscribed && "bg-opacity-75"
						)}>
						{isSubscribed ? "Subscribed" : "Subscribe"}
					</button>
				</div>
			</div>

			<nav className="bg-background flex justify-between text-center xs:text-sm mt-4 text-primary-text2 font-semibold max-w-2xl">
				{
					CHANNELNavItems.map((navItem) => (
						<Link key={navItem.id}
							to={`/${adminName}/${navItem.link}`}
							className="w-full"
							onClick={() => setPage(navItem.link)}>
							<h3
								className={twMerge(
									"px-2 py-1 duration-300",
									page === navItem.link &&
									"bg-white rounded-md text-primary"
								)}>
								{navItem.name}
							</h3>
						</Link>
					))
				}
			</nav>
		</div>
	);
};

export default ChannelHeader;

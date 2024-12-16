import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import "../../index.css"; // to use truncate-lines-2
import useWindowWidth from "../../hooks/useWindowWidth";
import { twMerge } from "tailwind-merge";

interface VideoListViewProps {
	videoNo?: number;
}

const RelatedVideo: React.FC<VideoListViewProps> = ({ videoNo }) => {
	const windowWidth = useWindowWidth();
	const duration = "10:00";
	const views = "1000k";
	const uploadedAt = "1 year";

	return (
		<div className={twMerge("flex gap-2 pl-2 group w-full p-2", videoNo == 1 && "bg-background-secondary")}>
			<Link to="/register" className="min-w-36 w-1/2 max-w-52">
				<div className="overflow-hidden rounded-xl max-w-md relative">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video group-hover:scale-110 duration-300"
					/>
					<p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex flex-col text-white w-full overflow-hidden">
				<Link to="/register" className="w-full">
					<h2
						className={twMerge(
							"font-semibold truncate-lines-2",
							windowWidth <= 500
								? "text-base"
								: windowWidth <= 766
									? "text-[17px]"
									: " text-sm"
						)}>
						Video Title scscscsdcsdcd sckhakjcbjsbkjcbkjsb
					</h2>
					<p
						className={twMerge(
							"opacity-80 text-nowrap truncate",
							windowWidth <= 500
								? "text-xs mt-0.5"
								: windowWidth <= 766
									? "mt-2 text-[13px] mb-1"
									: "text-xs mt-1 mb-0.5"
						)}>
						{views} Views · {uploadedAt} ago
					</p>
				</Link>
				<Link to="/login">
					<p
						className={twMerge(
							"opacity-80 hover:opacity-100 text-nowrap truncate",
							windowWidth <= 500
								? "text-[13px]"
								: windowWidth <= 766
									? "text-sm"
									: "text-[13px]"
						)}>
						Channel Name
					</p>
				</Link>
			</div>
		</div>
	);
};

export default RelatedVideo;

import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { secondsToHms } from "../../utils/SecondsToHms";
import { formatDateToNow } from "../../utils/formatDateToNow";
import { formatNumber } from "../../utils/FormatNumber";

interface VideoListViewProps {
	videoInfo?: any;
}
const VideoListView: React.FC<VideoListViewProps> = ({ videoInfo }) => {
	const duration = secondsToHms(videoInfo?.duration || 100);
	const views = formatNumber(videoInfo?.views || 10200);
	const uploadedAt = formatDateToNow(videoInfo?.createdAt || new Date());
	const description = videoInfo?.description || "This is a video description";
	const title = videoInfo?.title || "Video Title";
	// const thumbnail = videoInfo?.thumbnail || "https://via.placeholder.com/150";

	return (
		<div className="flex gap-4 p-2 group w-full justify-start">
			<Link to="/video/:videoId">
				<div className="overflow-hidden rounded-xl max-w-md w-fit relative">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video group-hover:scale-110 duration-300 relative z-0"
					/>
					<p className="px-1 py-[1px] z-10 absolute bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex flex-col text-white sm:w-2/3">
				<Link to="/video/:videoId">
					<h2 className="font-semibold text-lg truncate-lines-2">{title}</h2>
					<p className="text-xs opacity-80 text-nowrap mb-3 mt-1">
						{views} views · {uploadedAt}
					</p>
				</Link>
				<Link to="/user/videos">
					<div className="flex items-center gap-3 text-nowrap mb-2">
						<img
							src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=36&rounded=true"
							alt="Elon Musk"
							className="rounded-full aspect-square"
						/>
						<p className="text-sm opacity-80 hover:opacity-100">
							{videoInfo?.owner?.userName || "Channel Name"}
						</p>
					</div>
				</Link>
				<Link to="/video/:videoId">
					<p className="text-sm">{description}</p>
				</Link>
			</div>
		</div>
	);
};

export default VideoListView;

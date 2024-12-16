import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { formatDateToNow } from "../../utils/formatDateToNow";
import { secondsToHms } from "../../utils/SecondsToHms";
import { formatNumber } from "../../utils/FormatNumber";

interface VideoCardViewProps {
	videoInfo?: any;
}
const VideoCardView: React.FC<VideoCardViewProps> = ({ videoInfo }) => {
	const views = formatNumber(videoInfo?.views || 0);
	const duration = secondsToHms(videoInfo?.duration || 60);
	const uploadedAt = formatDateToNow(new Date(videoInfo?.uploadedAt || Date.now()));
	const title = videoInfo?.title || "Video Title";


	return (
		<div className="flex flex-col gap-2 p-2 group max-w-[400px]">
			<Link to="/video/:videoId">
				<div className="overflow-hidden rounded-xl relative">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video group-hover:scale-110 duration-300 relative z-0"
					/>
					<p className="px-1 py-[1px] absolute z-10 bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex gap-3">
				<Link to="/user/videos">
					<div className="overflow-hidden rounded-full">
						<img
							src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=36&rounded=true"
							alt="Elon Musk"
						/>
					</div>
				</Link>
				<div className="flex flex-col text-white w-full">
					<Link to="/video/:videoId">
						<h2 className="font-bold w-full truncate">{title}</h2>
						<p className="text-sm text-primary-text text-nowrap">
							{views} views · {uploadedAt}
						</p>
					</Link>
					<Link to="/user/videos">
						<p className="text-sm text-primary-text hover:opacity-100">
							{videoInfo?.owner?.userName || "Channel Name"}
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VideoCardView;

import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/FormatNumber";
import { formatDateToNow } from "../../../utils/FormatDateToNow";
import { formatDuration } from "../../../utils/FormatDuration";
import { VideoType } from "../../../Types/Video.type";

interface ChannelVideosCardProps {
	videoInfo: VideoType;
}
const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ videoInfo }) => {
	const duration = formatDuration(videoInfo?.duration);
	const views = formatNumber(videoInfo?.views);
	const uploadedAt = formatDateToNow(videoInfo?.updatedAt);
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
					<p className="px-1 py-[1px] absolute z-10 bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex gap-3">
				<div className="flex flex-col text-primary-text w-full">
					<Link to="/video/:videoId">
						<h2 className="font-bold">{title}</h2>
						<p className="text-sm text-primary-text2">
							{views} views · {uploadedAt}
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideosCard;

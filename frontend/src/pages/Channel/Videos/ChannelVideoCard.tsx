import React from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/FormatNumber";
import { formatDateDistanceToNow } from "../../../utils/FormatDateDistanceToNow";
import { formatDuration } from "../../../utils/FormatDuration";
import { VideoType } from "../../../type/Video.type";

interface ChannelVideosCardProps {
	videoInfo: VideoType;
}
const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ videoInfo }) => {
	const duration = formatDuration(videoInfo.duration);
	const views = formatNumber(videoInfo.views);
	const uploadedAt = formatDateDistanceToNow(videoInfo.updatedAt);
	const title = videoInfo.title;
	const videoId = videoInfo._id;

	return (
		<div className="flex flex-col gap-2 p-2 group max-w-[400px] w-full">
			<Link to={`/video/${videoId}`}>
				<div className="overflow-hidden rounded-xl relative">
					<img src={videoInfo.thumbnail.url} alt="thumbnail" loading='lazy'
						className="rounded-xl aspect-video object-cover w-full group-hover:scale-110 duration-300 relative z-0"
					/>
					<p className="px-1 py-[1px] absolute z-10 bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex gap-3">
				<div className="flex flex-col text-primary-text w-full">
					<Link to={`/video/${videoId}`}>
						<h2 className="font-bold truncate-lines-2">{title}</h2>
						<p className="text-sm text-primary-text2 truncate-lines-1">
							{views} views · {uploadedAt}
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideosCard;

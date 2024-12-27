import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { formatDuration } from "../../utils/FormatDuration";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { VideoType } from "../../Types/Video.type";

interface VideoListViewProps {
	heighlightVideo?: string;
	videoInfo: VideoType;
}

const RelatedVideo: React.FC<VideoListViewProps> = ({ heighlightVideo, videoInfo }) => {
	const duration = formatDuration(videoInfo?.duration);
	const views = formatNumber(videoInfo?.views);
	const uploadedAt = formatDateToNow(videoInfo?.createdAt || new Date());
	const title = videoInfo?.title || "Video Title";
	const channelName = videoInfo?.owner?.fullName || "Channel Name";
	const videoId = videoInfo?._id || "";
	const ownerName = videoInfo?.owner?.userName || "Channel Name";

	return (
		<div className={twMerge("flex gap-2 p-2 pl-0 2lg:pl-2 group w-full", heighlightVideo == videoInfo?._id && "bg-background-secondary")}>
			<Link to={`/video/${videoId}`} className="min-w-36 w-1/2 max-w-52">
				<div className="overflow-hidden rounded-xl max-w-md relative">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video group-hover:scale-110 duration-300"
					/>
					<p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex flex-col text-primary-text w-full overflow-hidden">
				<Link to={`/video/${videoId}`} className="w-full">
					<h2 className="font-semibold truncate-lines-2 2lg:text-sm xs:text-base sm:text-[17px]">
						{title}
					</h2>
					<p className="text-primary-text2 text-nowrap truncate 2lg:text-xs xs:text-sm sm:text-[15px] 2lg:mt-1 2lg:mb-0.5 xs:mt-0.5 sm:mt-2 sm:mb-1">
						{views} Views · {uploadedAt}
					</p>
				</Link>
				<Link to={`/${ownerName}/videos`}				>
					<p className="text-primary-text2 hover:text-primary-text text-nowrap truncate 2lg:text-[13px] xs:text-sm sm:text-[15px]">
						{channelName}
					</p>
				</Link>
			</div>
		</div>
	);
};

export default RelatedVideo;

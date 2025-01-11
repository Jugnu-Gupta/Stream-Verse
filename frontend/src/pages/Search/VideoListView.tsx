import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/FormatDuration";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import { formatNumber } from "../../utils/FormatNumber";
import { VideoType } from "../../Types/Video.type";
import { generateAvatar } from "../../utils/GenerateAvatar";

interface VideoListViewProps {
	videoInfo: VideoType;
}
const VideoListView: React.FC<VideoListViewProps> = ({ videoInfo }) => {
	const duration = formatDuration(videoInfo?.duration);
	const views = formatNumber(videoInfo?.views);
	const uploadedAt = formatDateDistanceToNow(videoInfo?.createdAt || new Date());
	const description = videoInfo?.description || "This is a video description";
	const ownerName = videoInfo?.owner?.userName || "Channel Name";
	const ownerFullName = videoInfo?.owner?.fullName || "Channel Name";
	const title = videoInfo?.title || "Video Title";
	const avatar = videoInfo?.owner?.avatar?.url || generateAvatar(ownerFullName, "0078e1", "ffffffcc");
	const videoId = videoInfo?._id || "";
	const navigate = useNavigate();

	return (
		<div className="flex gap-4 p-2 group w-full justify-start">
			<div className="overflow-hidden rounded-xl max-w-md w-fit relative" onClick={() => navigate(`/video/${videoId}`)}>
				<img src={thumbnail} alt="thumbnail" loading='lazy'
					className="rounded-xl aspect-video group-hover:scale-110 duration-300 relative z-0"
				/>
				<p className="px-1 py-[1px] z-10 absolute bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70">
					{duration}
				</p>
			</div>
			<div className="flex flex-col text-primary-text sm:w-2/3">
				<div onClick={() => navigate(`/video/${videoId}`)}>
					<h2 className="font-semibold text-lg truncate-lines-2">{title}</h2>
					<p className="text-sm truncate-lines-1 mb-3 mt-1 text-primary-text2">
						{views} views · {uploadedAt}
					</p>
				</div>
				<div className="flex items-center gap-3 text-nowrap mb-2" onClick={() => navigate(`/channel/@${ownerName}/videos`)}>
					<img src={avatar} alt="Elon Musk" loading='lazy' className="w-8 rounded-full aspect-square" />
					<p className="text-sm text-primary-text2 hover:text-primary-text">
						{ownerName}
					</p>
				</div>
				<div onClick={() => navigate(`/video/${videoId}`)} className="text-primary-text2 truncate-lines-2">
					<p className="text-sm">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default VideoListView;

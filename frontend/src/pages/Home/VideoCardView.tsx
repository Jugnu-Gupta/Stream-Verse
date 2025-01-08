import React from "react";
import { useNavigate } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { formatDuration } from "../../utils/FormatDuration";
import { formatNumber } from "../../utils/FormatNumber";
import { VideoType } from "../../Types/Video.type";
import { generateAvatar } from "../../utils/GenerateAvatar";

interface VideoCardViewProps {
	videoInfo: VideoType;
}
const VideoCardView: React.FC<VideoCardViewProps> = ({ videoInfo }) => {
	const views = formatNumber(videoInfo?.views);
	const duration = formatDuration(videoInfo?.duration);
	const uploadedAt = formatDateToNow(videoInfo?.updatedAt);
	const ownerName = videoInfo?.owner?.userName || "Channel Name";
	const ownerFullName = videoInfo?.owner?.fullName || "Channel Name";
	const title = videoInfo?.title || "Video Title";
	const videoId = videoInfo?._id || "";
	const avatar = videoInfo?.owner?.avatar?.url || generateAvatar(ownerFullName, "0078e1", "ffffffcc");
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-2 p-2 group max-w-[400px] overflow-hidden">
			<div className="overflow-hidden rounded-xl relative" onClick={() => navigate(`/video/${videoId}`)}>
				<img src={thumbnail} alt="thumbnail" loading='lazy'
					className="rounded-xl aspect-video group-hover:scale-110 duration-300 relative z-0" />
				<p className="px-1 py-[1px] absolute z-10 bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70">
					{duration}
				</p>
			</div>
			<div className="flex gap-3" onClick={() => navigate(`/${ownerName}/videos`)}>
				<div className="overflow-hidden rounded-full">
					<img src={avatar} alt="Elon Musk" loading='lazy' className="w-8 aspect-square rounded-full" />
				</div>
				<div className="flex flex-col text-primary-text w-full">
					<div onClick={() => navigate(`/video/${videoId}`)}>
						<h2 className="font-bold w-full truncate-clamp-1">{title}</h2>
						<p className="text-sm text-primary-text truncate-lines-1">
							{views} views · {uploadedAt}
						</p>
					</div>
					<div onClick={() => navigate(`/${ownerName}/videos`)}>
						<p className="text-sm text-primary-text2 hover:text-primary-text">
							{ownerName}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCardView;

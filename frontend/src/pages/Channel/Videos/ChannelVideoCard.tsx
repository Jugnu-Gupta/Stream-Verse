import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";

const ChannelVideosCard: React.FC = () => {
	const duration = "10:00";
	const views = "1000k";
	const uploadedAt = "1 year";

	return (
		<div className="flex flex-col gap-2 p-2 group max-w-[400px]">
			<Link to="/register">
				<div className="overflow-hidden rounded-xl relative">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video group-hover:scale-110 duration-300"
					/>
					<p className="px-1 py-[2px] absolute bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70">
						{duration}
					</p>
				</div>
			</Link>
			<div className="flex gap-3">
				<div className="flex flex-col text-white w-full">
					<Link to="/register">
						<h2 className="font-bold">Video Title</h2>
						<p className="text-sm opacity-80">
							{views} Views · {uploadedAt} ago
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideosCard;

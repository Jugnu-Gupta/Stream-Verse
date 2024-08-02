import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";

const VideoListView: React.FC = () => {
	const duration = "10:00";
	const views = "1000k";
	const uploadedAt = "1 year";
	const description = "This is a video description";

	return (
		<div className="flex gap-4 p-2 group w-full">
			<Link to="/register" className="w-1/2">
				<div className="overflow-hidden rounded-xl max-w-md relative">
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
			<div className="flex flex-col text-white">
				<Link to="/register">
					<h2 className="font-semibold text-lg">Video Title</h2>
					<p className="text-xs opacity-80 text-nowrap mb-3 mt-1">
						{views} Views · {uploadedAt} ago
					</p>
				</Link>
				<Link to="/login">
					<div className="flex items-center gap-3 text-nowrap mb-2">
						<img
							src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=36&rounded=true"
							alt="Elon Musk"
							className="rounded-full xs:w-7 aspect-square"
						/>
						<p className="text-sm opacity-80 hover:opacity-100">
							Channel Name
						</p>
					</div>
				</Link>
				<Link to="/register">
					<p className="text-sm">{description}</p>
				</Link>
			</div>
		</div>
	);
};

export default VideoListView;

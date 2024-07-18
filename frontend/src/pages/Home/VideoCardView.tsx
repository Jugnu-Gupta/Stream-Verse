import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";

const VideoCardView: React.FC = () => {
	const views = "1000k";
	const uploadedAt = "1 year";

	return (
		<Link to="/register">
			<div className="flex flex-col gap-2 p-2 group max-w-[400px]">
				<div className="overflow-hidden rounded-lg">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-lg aspect-video group-hover:scale-110 duration-300"
					/>
				</div>
				<div className="flex gap-3">
					<Link to="/login">
						<div className="overflow-hidden rounded-full">
							<img
								src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=36&rounded=true"
								alt="Elon Musk"
							/>
						</div>
					</Link>
					<div className="flex flex-col text-white">
						<h2 className="font-bold">Video Title</h2>
						<p className="text-sm opacity-80">
							{views} Views · {uploadedAt} ago
						</p>
						<Link to="/login">
							<p className="text-sm opacity-80 hover:opacity-100">
								Channel Name
							</p>
						</Link>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoCardView;

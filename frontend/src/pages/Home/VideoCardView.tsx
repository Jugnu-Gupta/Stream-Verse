import React from "react";
import thumbnail from "../../assets/thumbnail.png";

const VideoCardView: React.FC = () => {
	const views = "1000k";
	const uploadedAt = "1 year";
	return (
		<div className="flex flex-col">
			<div>
				<img src={thumbnail} alt="" />
			</div>
			<div className="flex gap-3">
				<div>
					<img
						src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=50&rounded=true"
						alt="Elon Musk"
					/>
				</div>
				<div className="flex flex-col">
					<h2 className="font-bold">Video Title</h2>
					<p>
						{views} Views · {uploadedAt} ago
					</p>
					<p>Channel Name</p>
				</div>
			</div>
		</div>
	);
};

export default VideoCardView;

import React from "react";
import VideoCardView from "./VideoCardView";

const Home: React.FC = () => {
	const videoInfo = {
		_id: "1",
		title: "Title",
		description: "Description",
		views: 100,
		duration: 100,
		owner: {
			_id: "1",
			userName: "Username",
			fullName: "Full Name",
		},
		thumbnail: {
			url: "https://via.placeholder.com/150",
			publicId: "1",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return (
		<div className="grid m-2 w-full justify-items-center 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1">
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
		</div>
	);
};

export default Home;

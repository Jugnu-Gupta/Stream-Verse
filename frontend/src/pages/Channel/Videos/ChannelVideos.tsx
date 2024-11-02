import React from "react";
import ChannelVideosCard from "./ChannelVideoCard";

const ChannelVideos: React.FC = () => {
	return (
		<div
			className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1" >
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
			<ChannelVideosCard />
		</div >
	);
};

export default ChannelVideos;

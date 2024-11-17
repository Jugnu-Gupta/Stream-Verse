import React from "react";
import ChannelVideosCard from "./ChannelVideoCard";
import { HiOutlineVideoCamera } from "react-icons/hi";

const ChannelVideos: React.FC = () => {
	const [videos, setVideos] = React.useState([]);

	if (videos.length === 0) {
		return (
			<div className="flex flex-col justify-between items-center text-center text-white px-4 w-full max-w-6xl mx-auto mt-4 z-0 mb-4">
				<HiOutlineVideoCamera className="text-4xl text-primary bg-blue-100 rounded-full p-1.5" />
				<h1 className="text-md font-semibold">No Playlists Created</h1>
				<p className="text-sm">There are no playlist created on this channel.</p>
			</div>
		);
	}

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

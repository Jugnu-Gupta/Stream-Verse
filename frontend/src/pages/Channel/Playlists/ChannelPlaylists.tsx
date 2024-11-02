import React from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";

const ChannelPlaylists: React.FC = () => {
	return (
		<div
			className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1">
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
		</div>
	);
};

export default ChannelPlaylists;

import React from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import { twMerge } from "tailwind-merge";
import useWindowWidth from "../../../hooks/useWindowWidth";

const handleWidth = (width: number) => {
	if (width <= 600) {
		return "grid-cols-1";
	} else if (width <= 875) {
		return "grid-cols-2";
	} else if (width <= 1250) {
		return "grid-cols-3";
	} else {
		return "grid-cols-4";
	}
};

const ChannelPlaylists: React.FC = () => {
	const windowWidth = useWindowWidth();

	return (
		<div
			className={twMerge(
				"grid px-4 w-full justify-items-center mt-4",
				handleWidth(windowWidth)
			)}>
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

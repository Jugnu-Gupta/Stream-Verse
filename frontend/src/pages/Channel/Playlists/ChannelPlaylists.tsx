import React from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import { twMerge } from "tailwind-merge";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";

const handleWidth = (width: number, isVisible: boolean) => {
	console.log(width, isVisible);
	if (width <= 550) {
		return "grid-cols-1";
	} else if (width <= 875) {
		return "grid-cols-2";
	} else if (width <= 1200) {
		return "grid-cols-3";
	} else if (!isVisible) {
		return "grid-cols-4";
	} else {
		return "grid-cols-3";
	}
};

const ChannelPlaylists: React.FC = () => {
	const windowWidth = useWindowWidth();
	const isVisible: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);

	return (
		<div
			className={twMerge(
				"grid px-4 w-full justify-items-center mt-4",
				handleWidth(windowWidth, isVisible)
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

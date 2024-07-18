import React from "react";
import VideoCardView from "./VideoCardView";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import useWindowWidth from "../../hooks/useWindowWidth";

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

const Home: React.FC = () => {
	const windowWidth = useWindowWidth();
	const isVisible: boolean = useSelector(
		(state: RootState) => state.navbar.showNavbar
	);

	return (
		<div
			className={twMerge(
				"grid m-2 w-full justify-items-center",
				handleWidth(windowWidth, isVisible)
			)}>
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
			<VideoCardView />
		</div>
	);
};

export default Home;

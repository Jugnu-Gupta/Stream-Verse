import React from "react";
import VideoCardView from "./VideoCardView";
import { twMerge } from "tailwind-merge";
// import useWindowWidth from "../../hooks/useWindowWidth";

// const handleWidth = (width: number) => {
// 	if (width <= 600) {
// 		return "grid-cols-1";
// 	} else if (width <= 875) {
// 		return "grid-cols-2";
// 	} else if (width <= 1250) {
// 		return "grid-cols-3";
// 	} else {
// 		return "grid-cols-4";
// 	}
// };

const Home: React.FC = () => {
	// const windowWidth = useWindowWidth();

	return (
		<div
			className={twMerge(
				"grid m-2 w-full justify-items-center ",
				// handleWidth(windowWidth)
				"2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1"
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

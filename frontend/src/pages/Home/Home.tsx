import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import VideoCardView from "./VideoCardView";
const Home: React.FC = () => {
	return (
		<div className="flex gap-2 min-h-[100vh]">
			{/* <div className="sticky left-0 top-0 h-[80vh] bg-red-400 z-[100] w-10"></div> */}
			<Navbar />
			<div className="grid grid-cols-3 gap-2">
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
		</div>
	);
};

export default Home;

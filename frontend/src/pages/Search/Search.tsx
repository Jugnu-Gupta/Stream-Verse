import React from "react";
import VideoListView from "./VideoListView";
import VideoCardView from "../Home/VideoCardView";

const Search: React.FC = () => {
	return (
		<>
			<div className="sm:grid hidden m-2 max-w-full w-11/12 justify-items-center">
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
				<VideoListView />
			</div>
			<div className="sm:hidden grid m-2 w-11/12 justify-items-center">
				<VideoCardView />
				<VideoCardView />
				<VideoCardView />
				<VideoCardView />
				<VideoCardView />
				<VideoCardView />
			</div>
		</>
	);
};

export default Search;

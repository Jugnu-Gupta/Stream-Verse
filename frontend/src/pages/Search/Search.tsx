import React from "react";
import VideoListView from "./VideoListView";

const Search: React.FC = () => {
	return (
		<div className="grid m-2 w-full justify-items-center">
			<VideoListView />
			<VideoListView />
			<VideoListView />
			<VideoListView />
			<VideoListView />
			<VideoListView />
			<VideoListView />
		</div>
	);
};

export default Search;

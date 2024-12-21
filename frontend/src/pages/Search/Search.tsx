import React from "react";
import VideoListView from "./VideoListView";
import VideoCardView from "../Home/VideoCardView";

const Search: React.FC = () => {
	const videoInfo = {
		_id: "1",
		title: "Title",
		description: "Description",
		views: 100,
		duration: 100,
		owner: {
			_id: "1",
			userName: "Username",
			fullName: "Full Name",
		},
		thumbnail: {
			url: "https://via.placeholder.com/150",
			publicId: "1",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	return (
		<div className="sm:flex m-2 max-w-full w-11/12">
			<div className='sm:flex hidden flex-col'>
				{/* {
					videos?.map((video: VideoType) => (
						<VideoListView key={video._id} videoInfo={video} />
					))
				} */}
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
				<VideoListView videoInfo={videoInfo} />
			</div>
			<div className='sm:hidden flex flex-col'>
				{/* {
					videos?.map((video: VideoType) => (
						<VideoCardView key={video._id} videoInfo={video} />
					))
				} */}
			</div>
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
			<VideoCardView videoInfo={videoInfo} />
		</div>
	);
};

export default Search;

import React, { useEffect } from "react";
import VideoCardView from "./VideoCardView";
import makeApiRequest from "../../utils/MakeApiRequest";
import { VideoType } from "../../Types/Video.type";

// const videoInfo = {
// 	_id: "1",
// 	title: "Title",
// 	description: "Description",
// 	views: 100,
// 	duration: 100,
// 	owner: {
// 		_id: "1",
// 		userName: "Username",
// 		fullName: "Full Name",
// 	},
// 	thumbnail: {
// 		url: "https://via.placeholder.com/150",
// 		publicId: "1",
// 	},
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// };
const Home: React.FC = () => {
	const [videos, setVideos] = React.useState<VideoType[]>([]);

	useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/videos`,
			params: {
				query: "",
				sortBy: "views",
			}
		}).then((response: any) => { // eslint-disable-line
			setVideos(response.data.data);
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
		});
	}, []);


	return (
		<div className="h-fit grid m-2 max-w-7xl w-full items-start 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1">
			{/* <div className='flex flex-wrap'> */}
			{videos?.map((video: VideoType) => (
				<VideoCardView key={video._id} videoInfo={video} />
			))}
			{/* </div> */}
		</div>
	);
};

export default Home;

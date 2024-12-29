import React from "react";
import ChannelVideosCard from "./ChannelVideoCard";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { useParams } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { VideoType } from "../../../Types/Video.type";

const ChannelVideos: React.FC = () => {
	const { adminName } = useParams<{ adminName: string }>();
	const [videos, setVideos] = React.useState<VideoType[]>([]);

	React.useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/users/video/${adminName?.substring(1)}`,
		}).then((response: any) => { // eslint-disable-line
			setVideos(response.data?.videos);
		}).catch((error) => {
			console.error("Error fetching data:", error);
		});
	}, [adminName]);

	if (videos?.length === 0) {
		return (
			<div className="flex flex-col justify-between items-center text-center text-primary-text px-4 w-full max-w-6xl mx-auto mt-4 z-0 mb-4">
				<HiOutlineVideoCamera className="text-4xl text-primary bg-blue-100 rounded-full p-1.5" />
				<h1 className="text-md font-semibold">No Playlists Created</h1>
				<p className="text-sm">There are no playlist created on this channel.</p>
			</div>
		);
	}

	return (
		<div
			className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1" >
			{videos?.map((video: VideoType) => (
				<ChannelVideosCard key={video._id} videoInfo={video} />
			))}
		</div >
	);
};

export default ChannelVideos;

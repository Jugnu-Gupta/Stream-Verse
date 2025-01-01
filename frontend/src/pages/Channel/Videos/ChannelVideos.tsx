import React from "react";
import ChannelVideosCard from "./ChannelVideoCard";
import { useParams } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { VideoType } from "../../../Types/Video.type";
import NoResultsFound from "../../Search/NoResultsFound";

const ChannelVideos: React.FC = () => {
	const { adminName } = useParams<{ adminName: string }>();
	const [videos, setVideos] = React.useState<VideoType[]>([]);
	const curUserName = "@" + localStorage.getItem("userName");

	React.useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/users/video/${adminName?.substring(1)}`,
		}).then((response: any) => { // eslint-disable-line
			if (curUserName !== adminName) {
				setVideos(response.data?.videos.filter(
					(video: VideoType) => video.isPublished === true));
			} else {
				setVideos(response.data?.videos);
			}
		}).catch((error) => {
			console.error("Error fetching data:", error);
		});
	}, [adminName, curUserName]);

	return (videos?.length === 0 ? <NoResultsFound entityName="video" style="mt-16"
		heading="No videos uploaded" message="This page has yet to upload a video." />
		: <div className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1" >
			{videos?.map((video: VideoType) => (
				<ChannelVideosCard key={video._id} videoInfo={video} />
			))}
		</div >
	);
};

export default ChannelVideos;

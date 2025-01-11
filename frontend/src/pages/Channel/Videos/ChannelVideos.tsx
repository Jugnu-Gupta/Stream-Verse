import React from "react";
import ChannelVideosCard from "./ChannelVideoCard";
import { useParams } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { VideoType } from "../../../Types/Video.type";
import NoResultsFound from "../../Search/NoResultsFound";
import loadingGIF from "../../../assets/loading.gif";
import { ErrorType } from "../../../Types/Error.type";
import { ResponseType } from "../../../Types/Response.type";

const ChannelVideos: React.FC = () => {
	const { adminName } = useParams<{ adminName: string }>();
	const [videos, setVideos] = React.useState<VideoType[]>([]);
	const curUserName = "@" + localStorage.getItem("userName");
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/users/video/${adminName?.substring(1)}`,
		}).then((response) => {
			const data = (response as ResponseType).data;
			if (curUserName !== adminName) {
				setVideos(data?.videos.filter(
					(video: VideoType) => video.isPublished === true));
			} else {
				setVideos(data?.videos);
			}
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	}, [adminName, curUserName]);

	return (videos?.length === 0 ?
		(!loading ? <NoResultsFound entityName="video" style="mt-16"
			heading="No videos uploaded" message="This page has yet to upload a video." />
			: (<div className='w-full h-full flex justify-center items-center'>
				<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
			</div>))
		: <div className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1" >
			{videos?.map((video: VideoType) => (
				<ChannelVideosCard key={video._id} videoInfo={video} />
			))}
		</div >
	);
};

export default ChannelVideos;

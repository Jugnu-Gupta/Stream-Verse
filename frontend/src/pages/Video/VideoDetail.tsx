import React, { useEffect } from "react";
import videoplayback from "../../assets/videoplayback.mp4";
import thumbnail from "../../assets/thumbnail.png";
import VideoComments from "./VideoComments";
import RelatedVideo from "./RelatedVideo";
import LikeSubscribeSave from "./LikeSubscribeSave";
import VideoPlaylist from "./VideoPlaylist";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import ShowHideText from "../../components/Text/ShowHideText";

const VideoDetail: React.FC = () => {
	const [searchParams] = useSearchParams();
	const { videoId } = useParams<string>();
	const navigate = useNavigate();
	const listId = searchParams.get("listId");

	const [playlist, setPlaylist] = React.useState<any>(null);
	const [video, setVideo] = React.useState<any>(null);
	const [similarVideos, setSimilarVideos] = React.useState<any[]>([]);
	const views = formatNumber(video?.views);
	const uploadedAt = formatDateToNow(video?.createdAt);
	const Subscribers = formatNumber(video?.subscribers);
	const channelName = video?.owner?.fullName || "Channel Name";
	const videoNo = video?._id || "0";
	const title = video?.title || "Video Title";
	const description = video?.description || "Video Description";
	// console.log("videoId:", videoId);
	// console.log("listId:", listId);

	useEffect(() => {
		console.log("listId:", listId);
		console.log("videoId:", videoId);
		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists/${"67502bffd0104e89cbb9be5e"}`,
		}).then((playlistRes: any) => {
			// console.log("playlist:", playlistResponse.data?.playlist);
			setPlaylist(playlistRes.data?.playlist);

			// find details of current video
			return makeApiRequest({
				method: "get",
				url: `/api/v1/videos/${"67502949d0104e89cbb9be5d"}`,
			});
		}).then((videoInfoRes: any) => {
			// console.log("videosResponse:", videosResponse.data?.video);
			setVideo(videoInfoRes.data?.video);

			// find similar videos
			return makeApiRequest({
				method: "get",
				url: `/api/v1/videos?query=${"advanced"}}`,
			})
		}).then((SimilarVideosRes: any) => {
			console.log("SimilarVideosRes:", SimilarVideosRes.data);

			setSimilarVideos(SimilarVideosRes.data?.videos);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate(listId ? `/video/${videoId}` : `/`);
			// navigate("/");
		})
	}, [listId, videoId, navigate]);

	return (
		<div
			className="flex flex-col 2lg:flex-row justify-start 2lg:items-start 2lg:gap-4 w-full px-2 mt-4 mx-auto max-w-[1400px]">
			<div className="flex flex-col 2lg:w-2/3 w-full">
				{/* video */}
				<video
					src={videoplayback}
					controls
					className="px-2 lg:px-0"></video>

				{/* Playlist */}
				<VideoPlaylist childClass="flex 2lg:hidden" heighlightVideo={videoNo} playlist={playlist} />

				{/* Description */}
				<div className="border-2 border-white rounded-lg p-2 mt-4 mx-2 lg:mx-0">
					<div className="flex items-center justify-between mb-2">
						<div className="text-white">
							<h1 className="text-lg font-bold tracking-wide">
								{title}
							</h1>
							<p className="text-sm">
								{views} views · {uploadedAt}
							</p>
						</div>
					</div>
					<div className="flex justify-between items-start gap-2">
						<div className="flex items-center gap-2 w-fit min-w-[150px]">
							<img
								src={thumbnail}
								alt="thumbnail"
								className="rounded-full w-10 h-10 aspect-square"
							/>
							<div className="text-white text-nowrap w-full">
								<h1 className="font-semibold sm:text-sm">
									{channelName}
								</h1>
								<p className="text-sm sm:text-xs">
									{Subscribers} Subscribers
								</p>
							</div>
						</div>

						{/* Like, Subscribe And Save */}
						<LikeSubscribeSave />
					</div>
					<div className="w-full bg-white border-b-2 my-3"></div>

					<ShowHideText content={description} />
				</div>

				{/* Comments */}
				<VideoComments videoId={videoNo} />
			</div>

			<div className="flex flex-col w-full 2lg:w-1/3 mt-4 2lg:mt-0">

				{/* Playlist */}
				<VideoPlaylist childClass="2lg:flex hidden" heighlightVideo={videoNo} playlist={playlist} />

				{/* Related Videos */}
				<div className="flex flex-col w-full">
					{
						similarVideos?.map((video: any) => (
							<RelatedVideo key={video?._id} videoInfo={video} />
						))
					}
				</div>
			</div>
		</div >
	);
};

export default VideoDetail;

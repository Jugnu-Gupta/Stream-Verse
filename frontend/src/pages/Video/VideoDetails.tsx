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
import { VideoDetailsType, VideoType } from "../../Types/Video.type";
import { PlaylistVideosType } from "../../Types/Platlist.type";

const VideoDetail: React.FC = () => {
	const [searchParams] = useSearchParams();
	const { videoId } = useParams<string>();
	const navigate = useNavigate();
	const listId = searchParams.get("listId");

	const [playlist, setPlaylist] = React.useState<PlaylistVideosType>();
	const [video, setVideo] = React.useState<VideoDetailsType>();
	const [similarVideos, setSimilarVideos] = React.useState<VideoType[]>([]);
	const views = formatNumber(video?.views);
	const uploadedAt = formatDateToNow(video?.createdAt);
	const Subscribers = formatNumber(video?.subscribers);
	const channelName = video?.owner?.fullName || "Channel Name";
	const description = video?.description || "Video Description";
	const userId = localStorage.getItem("userId");
	const noOfComments: number = video?.noOfComments || 10;
	const videoNo = video?._id || "";
	const title = video?.title || "Video Title";
	// console.log("videoId:", videoId);
	// console.log("listId:", listId);

	useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists/${"67502bffd0104e89cbb9be5e"}`,
		}).then((playlistRes: any) => { // eslint-disable-line
			setPlaylist(playlistRes.data?.playlist);

			// find details of current video
			return makeApiRequest({
				method: "get",
				url: `/api/v1/videos/${"67502949d0104e89cbb9be5d"}${(userId ? "/" + userId : "")}`,
			});
		}).then((videoInfoRes: any) => { // eslint-disable-line
			// console.log("videoInfoRes:", videoInfoRes.data);
			setVideo(videoInfoRes.data?.video);

			// find similar videos
			return makeApiRequest({
				method: "get",
				url: `/api/v1/videos?query=${"advanced"}}`,
			})
		}).then((SimilarVideosRes: any) => { // eslint-disable-line
			setSimilarVideos(SimilarVideosRes.data?.videos);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate(listId ? `/video/${videoId}` : `/`);
			// navigate("/");
		})
	}, [listId, videoId, userId, navigate]);

	return (
		<div
			className="flex flex-col 2lg:flex-row justify-start 2lg:items-start 2lg:gap-4 w-full px-2 mt-4 mx-auto max-w-[1400px] overflow-hidden">
			<div className="flex flex-col 2lg:w-2/3 w-full">
				{/* video */}
				<video
					src={videoplayback}
					controls></video>

				{/* Playlist */}
				<VideoPlaylist childClass="flex 2lg:hidden" heighlightVideo={videoNo} playlist={playlist} />

				{/* Description */}
				<div className="border-2 border-primary-border rounded-lg p-2 2lg:mt-4">
					<div className="flex items-center justify-between mb-2">
						<div className="text-primary-text">
							<h1 className="text-lg font-bold tracking-wide">
								{title}
							</h1>
							<p className="text-sm text-primary-text2">
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
							<div className="text-primary-text text-nowrap w-full">
								<h1 className="font-semibold sm:text-sm">
									{channelName}
								</h1>
								<p className="text-sm sm:text-xs">
									{Subscribers} Subscribers
								</p>
							</div>
						</div>

						{/* Like, Subscribe And Save */}
						{userId && <LikeSubscribeSave likes={video?.likes} dislikes={video?.dislikes} likeStatus={video?.likeStatus} entityType="video" entityId={videoNo} />}
					</div>
					<div className="w-full border-primary-border border-b-2 my-3"></div>

					<ShowHideText content={description} />
				</div>

				{/* Comments */}
				<VideoComments videoId={videoNo} noOfComments={noOfComments} />
			</div>

			<div className="flex flex-col w-full 2lg:w-1/3">

				{/* Playlist */}
				<VideoPlaylist childClass="2lg:flex hidden" heighlightVideo={videoNo} playlist={playlist} />

				{/* Related Videos */}
				<div className="flex flex-col w-full">
					{similarVideos?.map((video: VideoType) => (
						<RelatedVideo key={video?._id} videoInfo={video} />
					))}
				</div>
			</div>
		</div >
	);
};

export default VideoDetail;

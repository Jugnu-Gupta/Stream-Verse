import React, { useEffect } from "react";
import { Video } from 'cloudinary-react';
import VideoComments from "./VideoComments";
import RelatedVideo from "./RelatedVideo";
import LikeSubscribeSave from "./LikeSubscribeSave";
import VideoPlaylist from "./VideoPlaylist";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import ShowHideText from "../../components/Text/ShowHideText";
import { VideoDetailsType, VideoType } from "../../type/Video.type";
import { PlaylistVideosType } from "../../type/Platlist.type";
import { usePagination } from "../../hooks/usePagination";
import loadingGIF from '../../assets/loading.gif';
import NoResultsFound from "../Search/NoResultsFound";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";
import { generateAvatar } from "../../utils/GenerateAvatar";
import { BASE_URL } from "../../Constants";

const VideoDetail: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { videoId } = useParams<string>();
	const listId: string | null = searchParams.get("listId");
	const [playlist, setPlaylist] = React.useState<PlaylistVideosType>();
	const [video, setVideo] = React.useState<VideoDetailsType>();
	const [similarVideos, setSimilarVideos] = React.useState<VideoType[]>([]);
	const views = formatNumber(video?.views);
	const createdAt = formatDateDistanceToNow(video?.createdAt);
	const Subscribers = formatNumber(video?.subscribers);
	const channelName = video?.owner?.fullName || "Channel Name";
	const channelUserName = video?.owner?.userName || "Channel User Name";
	const description = video?.description || "Video Description";
	const userId = localStorage.getItem("userId");
	const noOfComments: number = video?.noOfComments || 10;
	const avatarUrl = video?.owner?.avatar?.url || generateAvatar(channelName, "0078e1", "ffffffcc", 50);
	const videoRef = React.useRef<HTMLVideoElement | null>(null);
	const title = video?.title || "Video Title";
	const videoPublicId = video?.videoFile?.publicId || "";

	useEffect(() => {
		const getPlaylistAndVideo = async () => {
			try {
				// Fetch playlist data is listId is present
				if (listId) {
					const playlistRes = await makeApiRequest({
						method: "get",
						url: `/api/v1/playlists/${listId}`,
					});
					const playlistData = (playlistRes as ResponseType).data?.playlist;

					// If the video doesn't exist in the playlist, navigate to /video/${videoId}
					if (!playlistData?.videos.some((video: VideoType) => video._id === videoId)) {
						return navigate(`/video/${videoId}`);
					}

					// Save playlist data to state
					setPlaylist(playlistData);
				}

				// Fetch video details
				const videoInfoRes = await makeApiRequest({
					method: "get",
					url: `/api/v1/videos/${videoId}`,
					params: { userId }
				});
				const videoData = (videoInfoRes as ResponseType).data?.video;
				setVideo(videoData);

				// Increment video views
				try {
					await makeApiRequest({
						method: "post",
						url: `/api/v1/videos/${videoId}/views`,
					});
				} catch (error) {
					console.error("Failed to increment video views:", (error as ErrorType).response.data.message);
				}
			} catch (error) {
				console.error((error as ErrorType).response.data.message);
				navigate(listId ? `/video/${videoId}` : `/`);
			}
		};
		getPlaylistAndVideo();
	}, [listId, videoId, userId, navigate]);

	const getSimilarVideos = (page: number, loading: boolean, hasMore: boolean, searchText: string) => {
		if (searchText.trim() === "" || loading || !hasMore) return;

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: "/api/v1/videos",
			params: {
				page,
				limit: 10,
				query: encodeURIComponent(searchText),
			}
		}).then((SimilarVideosRes) => {
			const simVideosData = (SimilarVideosRes as ResponseType).data?.data;

			setPage((prevPage) => prevPage + 1);
			setHasMore(simVideosData?.length > 0);
			setSimilarVideos((prev) => [...prev, ...simVideosData]);
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	};

	const { loading, setPage, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(getSimilarVideos, video?.title + " " + video?.description);

	useEffect(() => {
		if (!video?._id) return;
		setPage(1);
		setHasMore(true);
		getSimilarVideos(1, loading, true, video?.title + " " + video?.description);
	}, [video]);

	return (
		<div className="flex flex-col 2lg:flex-row justify-start 2lg:items-start 2lg:gap-4 w-full px-2 mt-4 mx-auto max-w-[1400px] overflow-hidden">
			<div className="flex flex-col 2lg:w-2/3 w-full">
				{/* video */}
				<Video
					duration={video?.duration || 0}
					cloudName="CLOUD_NAME"
					publicId={`${BASE_URL}/api/v1/videos/video/${videoPublicId}.mp4`}
					ref={videoRef}
					width="100%"
					height="auto"
					controls
					autoPlay>
				</Video>

				{/* Playlist */}
				<VideoPlaylist childClass={listId ? "flex 2lg:hidden" : "hidden"} heighlightVideo={videoId || ""} playlist={playlist} />

				{/* Description */}
				<div className="border-2 border-primary-border rounded-lg p-2 mt-4">
					<div className="flex items-center justify-between mb-2">
						<div className="text-primary-text">
							<h1 className="text-lg font-bold tracking-wide">
								{title}
							</h1>
							<p className="text-sm text-primary-text2">
								{views} views · {createdAt}
							</p>
						</div>
					</div>
					<div className="flex justify-between items-start gap-2">
						<div className="flex items-center gap-2 w-fit min-w-[150px] cursor-pointer"
							onClick={() => navigate(`/channel/@${channelUserName}/videos`)}>
							<img src={avatarUrl} alt="avatar" loading='lazy'
								className="rounded-full w-10 h-10 aspect-square" />
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
						{userId && <LikeSubscribeSave likes={video?.likes} dislikes={video?.dislikes} likeStatus={video?.likeStatus} entityType="video" entityId={videoId || ""} />}
					</div>
					<div className="w-full border-primary-border border-b-2 my-3"></div>

					<ShowHideText content={description} />
				</div>

				{/* Comments */}
				<VideoComments videoId={videoId || ""} noOfComments={noOfComments} />
			</div>

			<div className="flex flex-col w-full 2lg:w-1/3">

				{/* Playlist */}
				<VideoPlaylist childClass={listId ? "2lg:flex hidden" : "hidden"} heighlightVideo={videoId || ""} playlist={playlist} />

				{/* Related Videos */}
				<div className="flex flex-col w-full">
					{similarVideos.length > 0 ?
						similarVideos?.map((video: VideoType) => video._id !== videoId && (
							<RelatedVideo key={video?._id} videoInfo={video} />
						))
						: ((!video?._id && !hasMore) ?
							<NoResultsFound style="2lg:mt-40 mt-0" entityName="video" heading="No videos found"
								message="We couldn't find any similar videos at the moment. Please try again later." />
							: (<div className='w-full h-full flex justify-center items-center'>
								<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
							</div>))
					}
					<div ref={lastItemRef} key={"lastItemRef"} className="h-2 bg-transparent"></div>
				</div>
			</div>
		</div >
	);
};

export default VideoDetail;

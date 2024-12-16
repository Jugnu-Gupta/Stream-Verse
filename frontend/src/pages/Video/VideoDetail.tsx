import React, { useEffect } from "react";
import videoplayback from "../../assets/videoplayback.mp4";
import thumbnail from "../../assets/thumbnail.png";
import VideoComments from "./VideoComments";
import RelatedVideo from "./RelatedVideo";
// import { useParams } from "react-router-dom";
import LikeSubscribeSave from "./LikeSubscribeSave";
import VideoPlaylist from "./VideoPlaylist";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import makeApiRequest, { ApiRequestOptions } from "../../utils/MakeApiRequest";

const VideoDetail: React.FC = () => {
	const [readMore, setReadMore] = React.useState(false);
	const [searchParams] = useSearchParams();
	const { videoId } = useParams();
	const navigate = useNavigate();
	const listId = searchParams.get("listId");
	// console.log("videoId:", videoId);
	// console.log("listId:", listId);
	const views = 100;
	const videoNo = 1;
	const uploadedAt = "1 day";
	const Subscribers = 100;
	const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.";

	useEffect(() => {
		// fetch video details
		const fetchVideoDetails = async () => {
			try {
				if (listId) {
					const playlistRequest: ApiRequestOptions = {
						method: "get",
						url: `/api/v1/playlists/${listId}`,
					};
					const { data: playlist } = await makeApiRequest(playlistRequest);
					console.log(playlist);
				}

				const videoRequest: ApiRequestOptions = {
					method: "get",
					url: `/api/v1/videos/${videoId}`,
				};
				const { data: video } = await makeApiRequest(videoRequest);
				console.log(video);

				const subcribersRequest: ApiRequestOptions = {
					method: "get",
					url: `/api/v1/subscriptions/user/${video.ownerId}`,
				};

				const { data: subcribersData } = await makeApiRequest(subcribersRequest);
				console.log(subcribersData);
			} catch (error) {
				console.log(error);
				navigate(listId ? `/video/${videoId}` : `/`);
				// navigate(listId ? `/video/${videoId}` : `/video/${videoId}`);
			}
		};

		fetchVideoDetails();
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
				<VideoPlaylist childClass="flex 2lg:hidden" videoNo={videoNo} />

				{/* Description */}
				<div className="border-2 border-white rounded-lg p-2 mt-4 mx-2 lg:mx-0">
					<div className="flex items-center justify-between mb-2">
						<div className="text-white">
							<h1 className="text-lg font-bold tracking-wide">
								Video Title
							</h1>
							<p className="text-sm">
								{views} · {uploadedAt}
							</p>
						</div>
					</div>
					<div className="flex justify-between items-start gap-2">
						<div className="flex items-center gap-2">
							<img
								src={thumbnail}
								alt="thumbnail"
								className="rounded-full w-10 h-10 aspect-square"
							/>
							<div className="text-white text-nowrap">
								<h1 className="font-semibold sm:text-sm">
									Channel Name
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

					<div className="text-white">
						<p className="text-sm">
							{readMore
								? description
								: description.slice(0, 100) + "..."}
						</p>
						<button
							onClick={() => setReadMore(!readMore)}
							className="text-primary text-sm">
							{readMore ? "Read Less" : "Read More"}
						</button>
					</div>
				</div>

				{/* Comments */}
				<VideoComments />
			</div>

			<div className="flex flex-col w-full 2lg:w-1/3 mt-4 2lg:mt-0">

				{/* Playlist */}
				<VideoPlaylist childClass="2lg:flex hidden" videoNo={videoNo} />

				{/* Related Videos */}
				<div className="flex flex-col w-full">
					<RelatedVideo />
					<RelatedVideo />
					<RelatedVideo />
					<RelatedVideo />
					<RelatedVideo />
					<RelatedVideo />
					<RelatedVideo />
				</div>
			</div>
			{/* </div > */}
		</div >
	);
};

export default VideoDetail;

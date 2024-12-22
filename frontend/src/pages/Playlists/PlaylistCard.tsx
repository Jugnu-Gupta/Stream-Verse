import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { CgPlayList } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { PlaylistType } from "../../Types/Platlist.type";

interface ChannelVideosCardProps {
	playlist: PlaylistType; // include video id in playlist type
}

const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ playlist }) => {
	const noOfvideos = formatNumber(playlist?.noOfVideos);
	const updatedAt = formatDateToNow(playlist?.updatedAt);
	const title = playlist?.name || "Playlist Title";
	const playlistId = playlist?._id || "";
	const videoId = playlist?.videoId || "";
	const _thumbnail = thumbnail;

	return (
		<div className="flex flex-col gap-2 p-2 max-w-[400px]">
			<Link to={`/video/${videoId}${playlistId ? `?listId=${playlistId}` : ""}`}>
				<div className="overflow-hidden rounded-xl relative">
					<img
						src={_thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video duration-300"
					/>
					<p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
						<CgPlayList className="text-lg mt-[2px]" />
						<span>{noOfvideos} videos</span>
					</p>
					<div className="absolute text-primary-text z-10 top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
						<FaPlay />
						<span>PLAY ALL</span>
					</div>
				</div>
			</Link>
			<div className="flex gap-3">
				<div className="flex flex-col text-primary-text w-full">
					<Link to="/register">
						<h2 className="font-bold">{title}</h2>
						<p className="text-sm opacity-80">
							Updated {updatedAt}
						</p>
						<p className="text-sm opacity-80">View full playlist</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideosCard;

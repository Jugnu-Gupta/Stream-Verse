import React from "react";
import { Link } from "react-router-dom";
import { CgPlayList } from "react-icons/cg";
import { FaPlay, FaVideoSlash } from "react-icons/fa";
import { formatNumber } from "../../../utils/FormatNumber";
import { formatDateDistanceToNow } from "../../../utils/FormatDateDistanceToNow";
import { PlaylistType } from "../../../type/Platlist.type";

interface ChannelVideosCardProps {
	playlist: PlaylistType;
}

const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ playlist }) => {
	const noOfvideos = formatNumber(playlist?.noOfVideos);
	const updatedAt = formatDateDistanceToNow(playlist.updatedAt);
	const title = playlist.name;
	const playlistId = playlist._id;
	const videoId = playlist.videoId;

	return (
		<div className="flex flex-col gap-2 p-2 max-w-[400px] w-full">
			<Link to={`/video/${videoId}${playlistId ? `?listId=${playlistId}` : ""}`}>
				<div className="overflow-hidden rounded-xl relative w-full">
					{playlist.thumbnail?.url ?
						<img src={playlist.thumbnail?.url} alt="thumbnail" loading='lazy'
							className="rounded-xl aspect-video duration-300 w-full" />
						: <div className="rounded-xl aspect-video bg-background-secondary flex justify-center items-center w-full" >
							<FaVideoSlash className="text-primary-icon text-4xl" />
						</div>}
					<p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
						<CgPlayList className="text-lg mt-[2px]" />
						<span>{noOfvideos === 0 ? "No" : noOfvideos} videos</span>
					</p>
					{playlist.thumbnail?.url && <div className="absolute text-primary-text z-10 top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
						<FaPlay />
						<span>PLAY ALL</span>
					</div>}
				</div>
				<div className="flex gap-3 mt-2">
					<div className="flex flex-col w-full">
						<h2 className="font-bold text-primary-text">{title}</h2>
						<p className="text-sm text-primary-text2">Updated {updatedAt}</p>
						<p className="text-sm text-primary-text2">View full playlist</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ChannelVideosCard;

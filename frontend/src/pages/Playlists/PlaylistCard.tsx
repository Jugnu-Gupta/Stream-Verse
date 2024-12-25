import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { CgPlayList } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { PlaylistType } from "../../Types/Platlist.type";
import EditDeletePlaylist from "./EditDeletePlaylist";
import { EditDeleteWrapper } from "../../Types/EditDelete.type";

interface ChannelVideosCardProps extends EditDeleteWrapper {
	playlist: PlaylistType; // include video id in playlist type
}

const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ playlist, editDeleteOption, setEditDeleteOption }) => {
	const [playlistName, setPlaylistName] = React.useState<string>(playlist?.name || "Playlist Title");
	const noOfvideos = formatNumber(playlist?.noOfVideos);
	const updatedAt = formatDateToNow(playlist?.updatedAt);
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
					<div className="absolute text-primary-text z-[1] top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
						<FaPlay />
						<span>PLAY ALL</span>
					</div>
				</div>
			</Link >
			<div className="flex gap-3 mt-2">
				<div className="flex flex-col w-full relative">
					<Link to={`/video/${videoId}${playlistId ? `?listId=${playlistId}` : ""}`}>
						<h2 className="font-bold text-primary-text pr-8">{playlistName}</h2>
						<p className="text-sm text-primary-text2">Updated {updatedAt}</p>
						<p className="text-sm text-primary-text2">View full playlist</p>
					</Link >

					<EditDeletePlaylist playlistId={playlistId} playlist_Name={playlistName} updatePlaylistName={setPlaylistName} editDeleteOption={editDeleteOption} setEditDeleteOption={setEditDeleteOption} />
				</div>
			</div>
		</div >
	);
};

export default ChannelVideosCard;

import React from "react";
import { Link } from "react-router-dom";
import { CgPlayList } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { formatNumber } from "../../utils/FormatNumber";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import { PlaylistType } from "../../type/Platlist.type";
import EditDeletePlaylist from "./EditDeletePlaylist";
import { EditDeleteWrapper } from "../../type/EditDelete.type";
import { FaVideoSlash } from "react-icons/fa";

interface ChannelVideosCardProps extends EditDeleteWrapper {
	playlist: PlaylistType;
}

const ChannelVideosCard: React.FC<ChannelVideosCardProps> = ({ playlist, editDeleteOption, setEditDeleteOption }) => {
	const [playlistName, setPlaylistName] = React.useState<string>(playlist.name);
	const noOfVideos = formatNumber(playlist?.noOfVideos);
	const updatedAt = formatDateDistanceToNow(playlist?.updatedAt);
	const playlistId = playlist._id;
	const videoId = playlist.videoId;

	return (
		<div className="flex flex-col gap-2 p-2 max-w-[400px] w-full">
			<Link to={`/video/${videoId}${playlistId ? `?listId=${playlistId}` : ""}`} className="w-full">
				<div className="overflow-hidden rounded-xl relative w-full">
					{playlist.thumbnail?.url ?
						<img src={playlist.thumbnail.url} alt="thumbnail" loading='lazy'
							className="rounded-xl aspect-video object-cover duration-300 w-full" />
						: <div className="rounded-xl aspect-video bg-background-secondary flex justify-center items-center w-full" >
							<FaVideoSlash className="text-primary-icon text-4xl" />
						</div>
					}

					<p className="px-1 py-[1px] absolute z-[1] bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
						<CgPlayList className="text-lg mt-[2px]" />
						<span>{noOfVideos === 0 ? "No" : noOfVideos} videos</span>
					</p>
					{playlist.thumbnail?.url &&
						<div className="absolute text-primary-text z-[2] top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
							<FaPlay />
							<span>PLAY ALL</span>
						</div>}
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

import React from "react";
import { Link } from "react-router-dom";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import { PlaylistType } from "../../type/Platlist.type";
import { formatNumber } from "../../utils/FormatNumber";
import { CgPlayList } from "react-icons/cg";
import { FaPlay, FaVideoSlash } from "react-icons/fa";

interface VideoListViewProps {
    playlistInfo: PlaylistType | undefined;
}
const PlaylistListView: React.FC<VideoListViewProps> = ({ playlistInfo }) => {
    const noOfVideos = formatNumber(playlistInfo?.noOfVideos);
    const uploadedAt = formatDateDistanceToNow(playlistInfo?.createdAt || new Date());
    const description = playlistInfo?.description || "This is a playlist description";
    const ownerName = playlistInfo?.owner?.userName || "Channel Name";
    const title = playlistInfo?.name || "Video Title";
    const playlistId = playlistInfo?._id || "";
    const videoId = playlistInfo?.videoId || "";

    return (
        <div className="flex gap-4 p-2 group w-full justify-start">
            <Link to={`/video/${videoId}?listId=${playlistId}`} className="w-full">
                <div className="overflow-hidden rounded-xl max-w-md w-full h-fit relative">
                    {playlistInfo?.thumbnail?.url ?
                        <img src={playlistInfo.thumbnail.url} alt="thumbnail" loading='lazy'
                            className="rounded-xl aspect-video object-cover w-full duration-300" />
                        : <div className="rounded-xl aspect-video object-cover bg-background-secondary flex justify-center items-center w-full" >
                            <FaVideoSlash className="text-primary-icon text-4xl" />
                        </div>
                    }
                    <p className="px-1 py-[1px] absolute z[1] bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
                        <CgPlayList className="text-lg mt-[2px]" />
                        <span>{noOfVideos === 0 ? "No" : noOfVideos} videos</span>
                    </p>
                    {playlistInfo?.thumbnail?.url &&
                        <div className="absolute text-primary-text z-[2] top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
                            <FaPlay />
                            <span>PLAY ALL</span>
                        </div>
                    }
                </div>
            </Link>
            <div className="flex flex-col text-primary-text sm:w-2/3">
                <Link to={`/video/${videoId}`}>
                    <h2 className="font-semibold text-lg truncate-lines-2">{title}</h2>
                    <p className="text-sm truncate-lines-1 my-1 2lg:my-2 text-primary-text2">
                        {ownerName} · Created {uploadedAt}
                    </p>
                </Link>
                <Link to={`/video/${videoId}`} className="text-sm text-primary-text2">
                    <p className="truncate-lines-2">{description}</p>
                    <p className="truncate-lines-2 pt-2">View full playlist</p>
                </Link>
            </div>
        </div>
    );
};

export default PlaylistListView;

import React from "react";
import { Link } from "react-router-dom";
import { formatDateDistanceToNow } from "../../utils/FormatDateDistanceToNow";
import { formatNumber } from "../../utils/FormatNumber";
import { PlaylistType } from "../../type/Platlist.type";
import { CgPlayList } from "react-icons/cg";
import { FaPlay, FaVideoSlash } from "react-icons/fa";

interface PlaylistCardViewProps {
    playlistInfo: PlaylistType;
}
const PlaylistCardView: React.FC<PlaylistCardViewProps> = ({ playlistInfo }) => {
    const noOfVideos = formatNumber(playlistInfo?.noOfVideos);
    const uploadedAt = formatDateDistanceToNow(playlistInfo.createdAt);
    const ownerName = playlistInfo?.owner?.userName;
    const title = playlistInfo.name;
    const playlistId = playlistInfo._id;
    const videoId = playlistInfo.videoId;

    return (
        <div className="flex flex-col gap-2 p-2 group max-w-[400px] w-full">
            <Link to={`/video/${videoId}?listId=${playlistId}`} className="w-full">
                <div className="overflow-hidden rounded-xl max-w-md w-full relative">
                    {playlistInfo.thumbnail?.url ? <img src={playlistInfo.thumbnail.url} alt="thumbnail" loading='lazy'
                        className="rounded-xl aspect-video object-cover duration-300 w-full" />
                        : <div className="rounded-xl aspect-video object-cover bg-background-secondary flex justify-center items-center w-full" >
                            <FaVideoSlash className="text-primary-icon text-4xl" />
                        </div>
                    }
                    <p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
                        <CgPlayList className="text-lg mt-[2px]" />
                        <span>{noOfVideos === 0 ? "No" : noOfVideos} videos</span>
                    </p>
                    {playlistInfo.thumbnail?.url &&
                        <div className="absolute text-primary-text z-[1] top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
                            <FaPlay />
                            <span>PLAY ALL</span>
                        </div>}
                </div>
            </Link>
            <div className="flex gap-3">
                <div className="flex flex-col text-primary-text w-full">
                    <Link to={`/video/${videoId}`}>
                        <h2 className="font-bold w-full truncate">{title}</h2>
                        <p className="text-sm text-primary-text truncate-lines-1">
                            Created {uploadedAt}
                        </p>
                    </Link>
                    <Link to={`/channel/@${ownerName}/videos`}>
                        <p className="text-sm text-primary-text2 hover:text-primary-text">
                            {ownerName}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCardView;

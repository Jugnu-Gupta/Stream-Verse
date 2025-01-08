import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { formatNumber } from "../../utils/FormatNumber";
import { PlaylistType } from "../../Types/Platlist.type";
import { CgPlayList } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";

interface PlaylistCardViewProps {
    playlistInfo: PlaylistType;
}
const PlaylistCardView: React.FC<PlaylistCardViewProps> = ({ playlistInfo }) => {
    const noOfVideos = formatNumber(playlistInfo?.noOfVideos);
    const uploadedAt = formatDateToNow(playlistInfo?.createdAt || new Date());
    // const description = playlistInfo?.description || "This is a playlist description";
    const ownerName = playlistInfo?.owner?.userName || "Channel user Name";
    const title = playlistInfo?.name || "Video Title";
    // const _thumbnail = playlistInfo?.thumbnail || "";
    const playlistId = playlistInfo?._id || "";
    const videoId = playlistInfo?.videoId || "";

    return (
        <div className="flex flex-col gap-2 p-2 group max-w-[400px]">
            <Link to={`/video/${videoId}?listId=${playlistId}`}>
                <div className="overflow-hidden rounded-xl max-w-md w-fit relative">
                    <img src={thumbnail} alt="thumbnail" loading='lazy'
                        className="rounded-xl aspect-video duration-300" />
                    <p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70 flex items-center">
                        <CgPlayList className="text-lg mt-[2px]" />
                        <span>{noOfVideos} videos</span>
                    </p>
                    <div className="absolute text-primary-text z-[1] top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
                        <FaPlay />
                        <span>PLAY ALL</span>
                    </div>
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
                    <Link to={`/${ownerName}/videos`}>
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

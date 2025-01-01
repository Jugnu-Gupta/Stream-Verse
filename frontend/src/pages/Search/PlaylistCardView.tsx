import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.png";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { formatNumber } from "../../utils/FormatNumber";
import { PlaylistType } from "../../Types/Platlist.type";

interface PlaylistCardViewProps {
    playlistInfo: PlaylistType;
}
const PlaylistCardView: React.FC<PlaylistCardViewProps> = ({ playlistInfo }) => {
    const noOfVideos = formatNumber(playlistInfo?.noOfVideos) + " videos";
    const uploadedAt = formatDateToNow(playlistInfo?.createdAt || new Date());
    // const description = playlistInfo?.description || "This is a playlist description";
    const ownerName = playlistInfo?.owner?.userName || "Channel Name";
    const title = playlistInfo?.name || "Video Title";
    // const _thumbnail = playlistInfo?.thumbnail || "";
    const playlistId = playlistInfo?._id || "";
    const videoId = playlistInfo?.videoId || "";

    return (
        <div className="flex flex-col gap-2 p-2 group max-w-[400px]">
            <Link to={`/video/${videoId}?listId=${playlistId}`}>
                <div className="overflow-hidden rounded-xl relative">
                    <img src={thumbnail}
                        alt="thumbnail"
                        className="rounded-xl aspect-video group-hover:scale-110 duration-300 relative z-0"
                    />
                    <p className="px-1 py-[1px] absolute z-10 bottom-2 right-2 text-xs text-primary-text rounded-md bg-black bg-opacity-70">
                        {noOfVideos}
                    </p>
                </div>
            </Link>
            <div className="flex gap-3">
                <Link to={`/${ownerName}/videos`}>
                    <div className="overflow-hidden rounded-full">
                        <img src="https://ui-avatars.com/api/?format=svg&name=Elon+Musk&bold=true&background=random&size=36&rounded=true"
                            alt="Elon Musk"
                        />
                    </div>
                </Link>
                <div className="flex flex-col text-primary-text w-full">
                    <Link to={`/video/${videoId}`}>
                        <h2 className="font-bold w-full truncate">{title}</h2>
                        <p className="text-sm text-primary-text text-nowrap">
                            {ownerName} · {uploadedAt}
                        </p>
                    </Link>
                    <Link to={`/${ownerName}/videos`}>
                        <p className="text-sm text-primary-text2 hover:text-primary-text">
                            ownerName
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCardView;

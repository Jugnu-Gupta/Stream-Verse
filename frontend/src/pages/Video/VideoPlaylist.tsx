import React from 'react';
import { twMerge } from "tailwind-merge";
import { RxCross2 } from "react-icons/rx";
import RelatedVideo from "./RelatedVideo";
import { IoIosArrowDown } from "react-icons/io";
import { formatNumber } from '../../utils/FormatNumber';
import { PlaylistVideosType } from '../../Types/Platlist.type';
import { VideoType } from '../../Types/Video.type';

interface VideoPlaylistProps {
    childClass: string;
    heighlightVideo: string;
    playlist: PlaylistVideosType | undefined;
}

const VideoPlaylist: React.FC<VideoPlaylistProps> = ({ childClass, heighlightVideo, playlist }) => {
    const [showPlaylist, setShowPlaylist] = React.useState(true);
    const totalVideos = formatNumber(playlist?.noOfVideos);
    const curVideoIndex = playlist?.videos?.findIndex(
        (video: VideoType) => video._id === heighlightVideo) || 0;
    const playlistTitle = playlist?.name || "Playlist Title";
    const NextVideoTitle = "Next Video Title";
    const owner = playlist?.owner?.fullName || "Channel Name";

    return (
        <div className={twMerge(childClass, "flex-col w-full border-2 overflow-hidden rounded-xl mb-4 2lg:ml-2 mt-4 2lg:mt-0")}>
            <div className="text-white flex justify-between px-2 pt-2 pb-3 bg-background-secondary">
                <div>
                    {
                        showPlaylist
                            ? (<>
                                <h1 className="text-white text-md font-semibold"> {playlistTitle} </h1>
                                <p className="text-xs">{owner} - {curVideoIndex + 1}/{totalVideos}</p>
                            </>)
                            : (<>
                                <h1 className="text-white text-md font-semibold"> {curVideoIndex + 1 === totalVideos ? "End of Playlist" : `Next: ${NextVideoTitle}`}</h1>
                                <p className="text-xs">{playlistTitle} - {curVideoIndex + 1}/{totalVideos}</p>
                            </>)
                    }
                </div>
                {
                    showPlaylist
                        ? <button onClick={() => setShowPlaylist(false)}> <RxCross2 size={25} /> </button>
                        : <button onClick={() => setShowPlaylist(true)}> <IoIosArrowDown size={25} className="font-extrabold" /> </button>
                }
            </div>

            <div className={twMerge("flex flex-col w-full pt-2 max-h-[60vh] overflow-y-auto", !showPlaylist && "hidden")}>
                {
                    playlist?.videos?.map((video: VideoType) => (
                        <RelatedVideo key={video?._id} heighlightVideo={heighlightVideo} videoInfo={video} />
                    ))
                }
            </div>
        </div>
    )
}

export default VideoPlaylist;
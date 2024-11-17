import React from 'react';
import { twMerge } from "tailwind-merge";
import { RxCross2 } from "react-icons/rx";
import VideoListView from "./VideoList";
import { IoIosArrowDown } from "react-icons/io";

interface VideoPlaylistProps {
    childClass: string;
    videoNo: number;
}

const VideoPlaylist: React.FC<VideoPlaylistProps> = ({ childClass, videoNo }) => {
    const [showPlaylist, setShowPlaylist] = React.useState(true);
    const playlistTitle = "Playlist Title";
    const NextVideoTitle = "Next Video Title";
    const owner = "Owner";
    const totVideos = 10;

    return (
        <div className={twMerge(childClass, "flex-col w-full border-2 overflow-hidden rounded-xl mb-4 2lg:ml-2 mt-4 2lg:mt-0")}>
            <div className="text-white flex justify-between px-2 pt-2 pb-3 bg-background-secondary">
                <div>
                    {
                        showPlaylist
                            ? (<><h1 className="text-white text-md font-semibold"> {playlistTitle} </h1>
                                <p className="text-xs">{owner} - {videoNo}/{totVideos}</p></>)
                            : (<><h1 className="text-white text-md font-semibold"> Next: {NextVideoTitle} </h1>
                                <p className="text-xs">{playlistTitle} - {videoNo}/{totVideos}</p></>)
                    }
                </div>
                {
                    showPlaylist
                        ? <button onClick={() => setShowPlaylist(false)}> <RxCross2 size={25} /> </button>
                        : <button onClick={() => setShowPlaylist(true)}> <IoIosArrowDown size={25} className="font-extrabold" /> </button>
                }
            </div>

            <div className={twMerge("flex flex-col w-full pt-2 max-h-80 overflow-y-auto", !showPlaylist && "hidden")}>
                <VideoListView videoNo={1} />
                <VideoListView videoNo={2} />
                <VideoListView videoNo={3} />
                <VideoListView videoNo={4} />
                <VideoListView videoNo={5} />
                <VideoListView videoNo={6} />
                <VideoListView videoNo={7} />
            </div>
        </div>
    )
}

export default VideoPlaylist;
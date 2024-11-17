import React from 'react';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import SaveToPlaylist from "./SaveToPlaylist";

const LikeSubscribeSave: React.FC = () => {
    const [isliked, setIsLiked] = React.useState(false);
    const [isDisliked, setIsDisliked] = React.useState(false);
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const dislike = 100;
    const like = 100;

    return (
        <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={twMerge(
                    "bg-primary h-fit text-white outline-none font-semibold px-4 py-1 sm:px-3 sm:text-sm rounded-md hover:bg-white hover:text-primary duration-300",
                    isSubscribed && "bg-opacity-75"
                )}>
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
            <div className="border-2 border-white rounded-lg w-fit flex items-center px-2 my-2">
                <button
                    onClick={() => setIsLiked(!isliked)}
                    className="flex items-center gap-1 text-white outline-none border-r-2 pr-2 py-0.5">
                    {isliked ? <BiSolidLike /> : <BiLike />}
                    <span className="sm:text-sm">{like}</span>
                </button>
                <button
                    onClick={() => setIsDisliked(!isDisliked)}
                    className="flex items-center gap-1 text-white outline-none pl-2 py-0.5">
                    {isDisliked ? (
                        <BiSolidDislike />
                    ) : (
                        <BiDislike />
                    )}
                    <span className="sm:text-sm">
                        {dislike}
                    </span>
                </button>
            </div>

            <button className="relative group outline-none">
                <div className="flex items-center gap-1 relative rounded-md bg-white px-4 sm:px-3 py-1 text-black ">
                    <HiOutlineFolderAdd className="text-xl" />
                    <span className="sm:text-sm">Save</span>
                </div>

                {/* Save TO Playlist */}
                <SaveToPlaylist />
            </button>
        </div>
    )
}

export default LikeSubscribeSave;
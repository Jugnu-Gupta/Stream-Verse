import React from 'react';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import SaveToPlaylist from "./SaveToPlaylist";
import { formatNumber } from '../../utils/FormatNumber';
import useLikesAndDislikes from '../../hooks/useLikesAndDislikes';

interface LikeSubscribeSaveProps {
    entityId: string;
    entityType: string;
    likes: number | undefined;
    dislikes: number | undefined;
    likeStatus: number | undefined;
}
const LikeSubscribeSave: React.FC<LikeSubscribeSaveProps> = ({ likes, dislikes, likeStatus, entityId, entityType }) => {
    const { isLiked, isDisliked, handleLike, handleDislike } = useLikesAndDislikes({ entityId, entityType, likeStatus });
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const dislike = formatNumber(parseInt(dislikes?.toString() || '0') + (isDisliked ? (likeStatus === -1 ? 0 : 1) : (likeStatus === -1 ? -1 : 0)));
    const like = formatNumber(parseInt(likes?.toString() || '0') + (isLiked ? (likeStatus === 1 ? 0 : 1) : (likeStatus === 1 ? -1 : 0)));

    return (
        <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={twMerge(
                    "bg-primary h-fit text-white outline-none font-semibold px-3 py-1 sm:text-sm rounded-md hover:bg-white hover:text-primary duration-300",
                    isSubscribed && "bg-opacity-75"
                )}>
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
            <div className="border-2 border-white rounded-lg w-fit flex items-center px-2">
                <button
                    onClick={() => handleLike()}
                    className="flex items-center gap-1 text-white outline-none border-r-2 pr-2 py-0.5">
                    {isLiked ? <BiSolidLike /> : <BiLike />}
                    <span className="sm:text-sm">{like}</span>
                </button>
                <button
                    onClick={() => handleDislike()}
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

            <div className="relative group outline-none">
                <div className="flex items-center gap-1 relative rounded-md bg-white px-3 py-1 text-black">
                    <HiOutlineFolderAdd className="text-xl" />
                    <span className="sm:text-sm">Save</span>
                </div>

                {/* Save TO Playlist */}
                <SaveToPlaylist />
            </div>
        </div>
    )
}

export default LikeSubscribeSave;
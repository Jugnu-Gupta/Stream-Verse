import React from 'react';
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import SaveToPlaylist from "./SaveToPlaylist";
import useLikeDislike from '../../hooks/useLikeDislike';
import { computeDislikeCount, computeLikeCount }
    from '../../utils/ComputeLikeDislikeCount';

interface LikeSubscribeSaveProps {
    entityId: string;
    entityType: string;
    likes: number | undefined;
    dislikes: number | undefined;
    likeStatus: number | undefined;
}
const LikeSubscribeSave: React.FC<LikeSubscribeSaveProps> = ({ likes, dislikes, likeStatus, entityId, entityType }) => {
    const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike({ entityId, entityType, likeStatus });
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const dislike = computeDislikeCount(dislikes, likeStatus, isDisliked);
    const like = computeLikeCount(likes, likeStatus, isLiked);

    return (
        <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={twMerge(
                    "bg-subscribe h-fit text-primary-text outline-none font-semibold px-3 py-1 sm:text-sm rounded-md hover:scale-105 duration-300",
                    isSubscribed && "bg-opacity-75 bg-primary"
                )}>
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
            <div className="border-2 border-primary-border rounded-lg w-fit flex items-center px-2">
                <button
                    onClick={() => handleLike()}
                    className="flex items-center gap-1 text-primary-text outline-none border-r-2 border-primary-border pr-2 py-0.5">
                    {isLiked ? <BiSolidLike /> : <BiLike />}
                    <span className="sm:text-sm">{like}</span>
                </button>
                <button
                    onClick={() => handleDislike()}
                    className="flex items-center gap-1 text-primary-text outline-none pl-2 py-0.5">
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

            <div className="relative group outline-none cursor-pointer" tabIndex={0}>
                <div className="flex items-center gap-1 relative rounded-md bg-primary-text px-3 py-1 text-black hover:scale-105 duration-300">
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
import React, { Dispatch, SetStateAction } from 'react';
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
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import toast from 'react-hot-toast';
import { ErrorType } from '../../type/Error.type';

interface LikeSubscribeSaveProps {
    entityId: string;
    entityType: string;
    isSubscribed: boolean;
    likes: number | undefined;
    dislikes: number | undefined;
    channelId: string | undefined;
    likeStatus: number | undefined;
    channelUserName: string | undefined;
    setIsSubscribed: Dispatch<SetStateAction<boolean>>;
}
const LikeSubscribeSave: React.FC<LikeSubscribeSaveProps> =
    ({ likes, dislikes, likeStatus, entityId, entityType, channelUserName, channelId, isSubscribed, setIsSubscribed }) => {
        const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike({ entityId, entityType, likeStatus });
        const [showSaveToPlaylist, setShowSaveToPlaylist] = React.useState(false);
        const dislike = computeDislikeCount(dislikes, likeStatus, isDisliked);
        const like = computeLikeCount(likes, likeStatus, isLiked);
        const curUserName: string = localStorage.getItem("userName") || "";
        const navigate = useNavigate();

        const handleSubscribe = () => {
            if (!channelId) return;

            makeApiRequest({
                method: "post",
                url: `/api/v1/subscriptions/toggle/${channelId}`,
            }).then(() => {
                setIsSubscribed(!isSubscribed);
            }).catch((error: ErrorType) => {
                if (error.response.data.statusCode === 401) {
                    toast.error("Please login to subscribe");
                }
                console.log(error.response.data.message);
            });
        }

        return (
            <div className="flex items-center gap-2 flex-wrap justify-end">
                {channelUserName !== curUserName ? <button
                    onClick={handleSubscribe}
                    className={twMerge(
                        "bg-subscribe h-fit text-primary-text outline-none font-semibold px-3 py-1 sm:text-sm rounded-md hover:scale-105 duration-300",
                        isSubscribed && "bg-opacity-75 bg-primary"
                    )}>
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                </button>
                    : <button onClick={() => navigate(`/user/@${curUserName}/dashboard`)}
                        className="bg-primary h-fit text-primary-text outline-none font-semibold px-3 py-1 sm:text-sm rounded-md hover:scale-105 duration-300">
                        Dashboard
                    </button>
                }
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

                <div className="relative outline-none cursor-pointer" tabIndex={0}>
                    <button className="flex items-center gap-1 relative rounded-md bg-primary-text px-3 py-1 text-black hover:scale-105 duration-300"
                        onClick={() => setShowSaveToPlaylist(!showSaveToPlaylist)}>
                        <HiOutlineFolderAdd className="text-xl" />
                        <span className="sm:text-sm">Save</span>
                    </button>

                    {/* Save TO Playlist */}
                    {showSaveToPlaylist && <SaveToPlaylist videoId={entityId} setShowSaveToPlaylist={setShowSaveToPlaylist} />}
                </div>
            </div>
        )
    }

export default LikeSubscribeSave;
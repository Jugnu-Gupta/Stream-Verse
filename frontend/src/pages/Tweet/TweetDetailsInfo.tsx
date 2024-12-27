import React from "react";
import thumbnail from "../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiCommentDetail } from "react-icons/bi";
import { formatDateToNow } from "../../utils/FormatDateToNow";
import { formatNumber } from "../../utils/FormatNumber";
import { TweetType } from "../../Types/Tweet.type";
import useLikeDislike from "../../hooks/useLikeDislike";
import { computeDislikeCount, computeLikeCount }
    from "../../utils/ComputeLikeDislikeCount";


interface ChannelTweetListProps {
    tweetInfo: TweetType | undefined;
}
const TweetDetailsInfo: React.FC<ChannelTweetListProps> = ({ tweetInfo }) => {
    const { isLiked, isDisliked, handleLike, handleDislike } = useLikeDislike(
        { entityId: tweetInfo?._id || "", entityType: "tweet", likeStatus: tweetInfo?.likeStatus });
    const [readMore, setReadMore] = React.useState<boolean>(false);
    const UploadedAt = formatDateToNow(tweetInfo?.createdAt);
    const dislikes = computeDislikeCount(tweetInfo?.dislikes, tweetInfo?.likeStatus, isDisliked);
    const likes = computeLikeCount(tweetInfo?.likes, tweetInfo?.likeStatus, isLiked);
    const comments = formatNumber(tweetInfo?.comments);
    const tweetId = tweetInfo?._id || "";
    const channelName = tweetInfo?.owner?.fullName || "channel Name";
    const content = tweetInfo?.content || "description";
    const tweetText = (readMore || content.length <= 100) ? content : `${content.slice(0, 100)}...`;

    return (<div className="flex items-start gap-2 p-2 w-full">
        <Link to={`/tweets/${tweetId}`}>
            <div className="overflow-hidden rounded-full w-10">
                <img src={thumbnail} alt="thumbnail"
                    className="rounded-full w-10 aspect-square" />
            </div>
        </Link>
        <div className="flex flex-col text-primary-text w-full">
            <div className="flex gap-2 items-center mb-2">
                <p className="text-sm font-semibold">{channelName}</p>
                <p className="text-primary-text2 text-xs">{UploadedAt}</p>
            </div>
            <div className="flex flex-col items-start">
                <p className="text-primary-text w-full h-8 pb-1 xs:text-sm ">{tweetText}</p>
                {tweetText.length > 100 &&
                    (<button
                        onClick={() => setReadMore(!readMore)}
                        className="text-sm text-primary-text font-semibold mt-3">
                        {readMore ? "Show less" : "Read more"}
                    </button>)
                }

            </div>
            {thumbnail && (
                <Link to={`/tweets/${tweetId}`}>
                    <div className="overflow-hidden rounded-lg m-2 w-fit">
                        <img src={thumbnail} alt="thumbnail"
                            className="rounded-lg w-full aspect-auto" />
                    </div>
                </Link>
            )}

            <div className="flex justify-start gap-3 font-semibold tracking-wide">
                <button onClick={handleLike}
                    className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
                    {isLiked ? <BiSolidLike /> : <BiLike />}
                    <span className="text-xs">{likes}</span>
                </button>
                <button onClick={handleDislike}
                    className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
                    {isDisliked ? <BiSolidDislike /> : <BiDislike />}
                    <span className="text-xs">{dislikes}</span>
                </button>
                <Link to="../../tweets/:tweetId">
                    <button className="flex items-center gap-1 text-xl hover:bg-background-secondary px-2 py-1 rounded-xl duration-300">
                        <BiCommentDetail className="-scale-x-100" />
                        <span className="text-xs">{comments}</span>
                    </button>
                </Link>
            </div>
        </div>
    </div>);
};

export default TweetDetailsInfo;

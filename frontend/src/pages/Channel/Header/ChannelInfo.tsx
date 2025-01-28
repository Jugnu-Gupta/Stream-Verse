import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { formatNumber } from '../../../utils/FormatNumber';
import { ChannelInfoType } from '../../../type/Channel.type';
import { generateAvatar } from '../../../utils/GenerateAvatar';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { ErrorType } from '../../../type/Error.type';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../context/store';
import { decreaseCount, increaseCount, setCounter } from '../../../context/slices/Counter.slice';

interface ChannelInfoProps {
    channelInfo: ChannelInfoType | undefined;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channelInfo }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const adminName = "@" + (channelInfo?.userName || "adminName");
    const channelName = channelInfo?.fullName || "channel Name";
    const curUserName: string = "@" + localStorage.getItem("userName");
    const subscribersCount = useSelector((state: RootState) => state.counter.value);
    const subscribers = formatNumber(subscribersCount);
    const videos = formatNumber(channelInfo?.videoCount);
    const avatar = channelInfo?.avatar?.url ||
        generateAvatar(channelName, "0078e1", "ffffffcc", 150);

    useEffect(() => {
        setIsSubscribed(channelInfo?.isSubscribed || false);
        dispatch(setCounter({ value: channelInfo?.subscriberCount || 0 }));
    }, [channelInfo, dispatch]);

    const handleSubscribe = () => {
        makeApiRequest({
            method: "post",
            url: `/api/v1/subscriptions/toggle/${channelInfo?._id}`,
        }).then(() => {
            setIsSubscribed(!isSubscribed);
            if (isSubscribed) {
                dispatch(decreaseCount());
            } else {
                dispatch(increaseCount());
            }
        }).catch((error: ErrorType) => {
            if (error.response.data.statusCode === 401) {
                toast.error("Please login to subscribe");
            }
            console.log(error.response.data.message);
        });
    }

    return (
        <>
            <div className="w-full">
                {
                    channelInfo?.coverImage?.url &&
                    (<img src={channelInfo?.coverImage?.url} alt="Background" loading='lazy'
                        className="w-full aspect-[5] rounded-2xl object-cover" />)
                }
            </div>
            <div className="flex items-center justify-between">
                <div className="flex mt-4 gap-4 items-center w-fit mr-2">
                    <div>
                        <img src={avatar} alt="Background" loading='lazy'
                            className="w-28 xs:w-24 aspect-square rounded-full"
                        />
                    </div>
                    <div className="text-primary-text2 xs:text-sm">
                        <h1 className="text-primary-text font-bold text-3xl pb-1 xs:text-xl">
                            {channelName}
                        </h1>
                        <p className="pb-1">{adminName}</p>
                        <p>{subscribers} subscribers · {videos} videos</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-end w-fit">
                    <button onClick={() => navigate(`/user/${adminName}/dashboard`)}
                        className={twMerge("bg-primary text-primary-text font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:scale-105 duration-300",
                            adminName !== curUserName && "hidden")}>
                        Dashboard
                    </button>
                    {adminName !== curUserName &&
                        <button onClick={handleSubscribe}
                            className={twMerge(
                                "bg-subscribe text-primary-text font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:scale-105 duration-300 ml-2",
                                isSubscribed && "bg-primary"
                            )}>
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default ChannelInfo;
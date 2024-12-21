import React from 'react';
import Background from "../../../assets/thumbnail.png";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { formatNumber } from '../../../utils/FormatNumber';
import { ChannelInfoType } from '../../../Types/Channel.type';

interface ChannelInfoProps {
    channelInfo: ChannelInfoType | undefined;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channelInfo }) => {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const adminName = "@" + (channelInfo?.userName || "adminName");
    const channelName = channelInfo?.fullName || "channel Name"; // find out whose channel is this
    const curUserName: string = "@" + localStorage.getItem("userName");
    const subscribers = formatNumber(channelInfo?.subscriberCount);
    const videos = formatNumber(channelInfo?.videoCount);

    return (
        <>
            <div className="w-full">
                <img
                    src={Background}
                    alt="Background"
                    className="w-full aspect-[5] rounded-2xl object-cover"
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex mt-4 gap-4 items-center w-fit mr-2">
                    <div>
                        <img
                            src={Background}
                            alt="Background"
                            className="w-28 xs:w-24 aspect-square rounded-full"
                        />
                    </div>
                    <div className="text-primary-text xs:text-sm">
                        <h1 className="text-white font-bold text-3xl pb-1 xs:text-xl">
                            {channelName}
                        </h1>
                        <p className="pb-1">{adminName}</p>
                        <p>{subscribers} subscribers · {videos} videos</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-end w-fit">
                    <button
                        onClick={() => navigate(`/${adminName}/dashboard`)}
                        className={twMerge("bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300",
                            adminName !== curUserName && "hidden")}>
                        Dashboard
                    </button>
                    {
                        adminName !== curUserName &&
                        <button
                            onClick={() => setIsSubscribed(!isSubscribed)}
                            className={twMerge(
                                "bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300 ml-2",
                                isSubscribed && "bg-opacity-75"
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
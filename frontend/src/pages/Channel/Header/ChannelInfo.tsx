import React from 'react';
import Background from "../../../assets/thumbnail.png";
import { useParams, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const ChannelInfo: React.FC = () => {
    const [isSubscribed, setIsSubscribed] = React.useState(false);
    const { adminName } = useParams<{ adminName: string }>();
    const channelName: string = localStorage.getItem("fullName") || "channel Name"; // find out whose channel is this
    const curUser: string = "@" + localStorage.getItem("userName");
    const navigate = useNavigate();
    const subscribers = "100k";
    const videos = "100";

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
                            adminName !== curUser && "hidden")}>
                        Dashboard
                    </button>
                    {
                        adminName !== curUser &&
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
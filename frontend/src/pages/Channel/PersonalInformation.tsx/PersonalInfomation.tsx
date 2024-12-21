import React, { useEffect } from "react";
import PersonalInfoForm from './PersonalInfoForm';
import Background from "../../../assets/thumbnail.png";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { CHANNELNAVITEMS2 } from "../../../Constants/ChannelNavbar";
import ChannelNavbar from "../Navbar/ChannelNavbar";
import { updateImage } from "../../../utils/UpdateImage";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { formatNumber } from "../../../utils/FormatNumber";
import { ChannelInfoType } from "../../../Types/Channel";

const PersonalInformation: React.FC = () => {
    const [channelInfo, setChannelInfo] = React.useState<ChannelInfoType>();
    const [coverImage, setCoverImage] = React.useState<string>("");
    const [avatarImage, setAvatarImage] = React.useState<string>("");
    const adminName: string = "@" + localStorage.getItem("userName");
    const channelName: string = localStorage.getItem("fullName") || "Channel Title";
    const subscribers = formatNumber(channelInfo?.subscriberCount);
    const videos = formatNumber(channelInfo?.videoCount);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminName) navigate("/");
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response: any) => { // eslint-disable-line
            setChannelInfo(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate, adminName]);

    return (
        <div className="w-full">
            {/* <ChannelHeader /> */}
            <div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
                <div className="w-full relative">
                    <img
                        src={coverImage !== "" ? coverImage : Background}
                        alt="Background"
                        className="w-full aspect-[5] rounded-2xl object-cover"
                    />
                    <label htmlFor="coverImage"
                        className="p-1 absolute rounded-md bg-blue-100 backdrop-blur-xl cursor-pointer outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <FiUpload className="text-primary text-xl blur-xs" />
                    </label>
                    <input type="file" name="coverImage" id="coverImage" className="hidden" accept="image/png,image/jpeg"
                        onChange={(e) => updateImage(e, setCoverImage, 1024 * 1024)} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex mt-4 gap-4 items-center w-fit mr-2">
                        <div className="relative">
                            <img
                                src={avatarImage !== "" ? avatarImage : Background}
                                alt="Background"
                                className="w-28 xs:w-24 aspect-square rounded-full"
                            />
                            <label htmlFor="avatarImage"
                                className="p-1 absolute rounded-md bg-blue-100 backdrop-blur-xl cursor-pointer outline-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <FiUpload className="text-primary text-xl blur-xs" />
                            </label>
                            <input type="file" name="avatarImage" id="avatarImage" className="hidden" accept="image/png,image/jpeg"
                                onChange={(e) => updateImage(e, setAvatarImage, 1024 * 1024)} />
                        </div>

                        <div className="text-primary-text xs:text-sm">
                            <h1 className="text-white font-bold text-3xl pb-1 xs:text-xl">{channelName}</h1>
                            <p className="pb-1">{adminName}</p>
                            <p>{subscribers} subscribers · {videos} videos</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end w-fit">
                        <button
                            onClick={() => navigate(`/${adminName}/dashboard`)}
                            className="bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300">
                            Dashboard
                        </button>
                    </div>
                </div>

                <ChannelNavbar channelNavItems={CHANNELNAVITEMS2} />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap sm:px-6 px-2 w-full max-w-6xl mx-auto mt-4" >
                <div className='text-white md:w-full sm:w-3/4 w-full'>
                    <h2 className='font-semibold text-sm'>Personal Info</h2>
                    <p className='text-sm text-gray-300'>Update your photo and personal details</p>
                </div>

                <div className='mb-4 w-full'>
                    <PersonalInfoForm channelInfo={channelInfo} />
                </div>
            </div >
        </div>
    );
};

export default PersonalInformation;
import React, { useEffect } from "react";
import PersonalInfoForm from './PersonalInfoForm';
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { CHANNELNAVITEMS2 } from "../../../Constants/ChannelNavbar";
import ChannelNavbar from "../Navbar/ChannelNavbar";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { formatNumber } from "../../../utils/FormatNumber";
import { ChannelInfoType } from "../../../Types/Channel.type";
import { useMedia } from "../../../hooks/useMedia";
import { ErrorType } from "../../../Types/Error.type";
import { ResponseType } from "../../../Types/Response.type";

const PersonalInformation: React.FC = () => {
    const [channelInfo, setChannelInfo] = React.useState<ChannelInfoType>();
    const coverImage = channelInfo?.coverImage.url || "";
    const avatarImage = channelInfo?.avatar.url || "";
    const adminName: string = "@" + localStorage.getItem("userName");
    const channelName: string = localStorage.getItem("fullName") || "Channel Title";
    const subscribers = formatNumber(channelInfo?.subscriberCount);
    const { fileInputRef: coverFileRef, mediaPreview: coverImgPreview, newMedia: newCoverImg, handleMediaChange: handleCoverImgChange, discardMediaChange: discardCoverImgChange } =
        useMedia();
    const { fileInputRef: avatarFileRef, mediaPreview: avatarPreview, newMedia: newavatar, handleMediaChange: handleAvatarChange, discardMediaChange: discardAvatarChange } =
        useMedia();
    const videos = formatNumber(channelInfo?.videoCount);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminName) navigate("/");
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response) => {
            const data = (response as ResponseType).data;
            setChannelInfo(data);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        });
    }, [navigate, adminName]);

    return (
        <div className="w-full">
            {/* <ChannelHeader /> */}
            <div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
                <div className="w-full relative">
                    <img src={coverImgPreview ? coverImgPreview : coverImage}
                        alt="Background" loading='lazy'
                        className="w-full aspect-[5] rounded-2xl object-cover"
                    />
                    <label htmlFor="coverImage"
                        className="p-1 absolute rounded-md bg-background-secondary opacity-40 hover:opacity-50 
                        duration-300 backdrop-blur-xl cursor-pointer outline-none bottom-2 right-2">
                        <FiUpload className="text-white text-xl blur-xs" />
                    </label>
                    <input type="file" name="coverImage" id="coverImage" className="hidden" accept="image/png,image/jpeg"
                        onChange={(e) => handleCoverImgChange(e, 1)} ref={coverFileRef} />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex mt-4 gap-4 items-center w-fit mr-2">
                        <div className="relative">
                            <img src={avatarPreview ? avatarPreview : avatarImage}
                                alt="Background" loading='lazy'
                                className="w-28 xs:w-24 aspect-square rounded-full"
                            />
                            <label htmlFor="avatarImage"
                                className="p-1 absolute rounded-md bg-background-secondary opacity-40 hover:opacity-50 
                                duration-300 backdrop-blur-xl cursor-pointer outline-none bottom-2 left-1/2 -translate-x-1/2">
                                <FiUpload className="text-white text-xl blur-xs" />
                            </label>
                            <input type="file" name="avatarImage" id="avatarImage" className="hidden" accept="image/png,image/jpeg"
                                onChange={(e) => handleAvatarChange(e, 1)} ref={avatarFileRef} />
                        </div>

                        <div className="xs:text-sm">
                            <h1 className="text-primary-text font-bold text-3xl pb-1 xs:text-xl">{channelName}</h1>
                            <p className="pb-1 text-primary-text2">{adminName}</p>
                            <p className="text-primary-text2">{subscribers} subscribers · {videos} videos</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end w-fit">
                        <button onClick={() => navigate(`/user/${adminName}/dashboard`)}
                            className="bg-primary text-primary-text font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:scale-105 duration-300">
                            Dashboard
                        </button>
                    </div>
                </div>

                <ChannelNavbar entityType="user" channelNavItems={CHANNELNAVITEMS2} />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap sm:px-6 px-2 w-full max-w-6xl mx-auto mt-4" >
                <div className='md:w-full sm:w-3/4 w-full'>
                    <h2 className='font-semibold text-sm text-primary-text'>Personal Info</h2>
                    <p className='text-sm text-primary-text2'>Update your photo and personal details</p>
                </div>

                <div className='mb-4 w-full'>
                    <PersonalInfoForm channelInfo={channelInfo} newCoverImg={newCoverImg || null} newAvatar={newavatar || null}
                        discardCoverImgChange={discardCoverImgChange} discardAvatarChange={discardAvatarChange} />
                </div>
            </div >
        </div>
    );
};

export default PersonalInformation;
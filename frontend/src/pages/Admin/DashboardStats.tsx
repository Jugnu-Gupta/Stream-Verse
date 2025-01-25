import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import { DashboardStatsType } from '../../type/Dashboard.type';
import UploadVideoModal from "../../components/Popup/UploadVideoModal";
import UploadingVideoModal from '../../components/Popup/UploadingVideoModal';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';

interface DashboardStatsProps {
    showUploadingVideo: boolean;
    setShowUploadingVideo: Dispatch<SetStateAction<boolean>>;
}
const DashboardStats: React.FC<DashboardStatsProps> = ({ showUploadingVideo, setShowUploadingVideo }) => {
    const navigate = useNavigate();
    const [showUploadVideo, setShowUploadVideo] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState<number>(0);
    const [videoName, setVideoName] = React.useState<string>("");
    const [videoSize, setVideoSize] = React.useState<number>(0);
    const [stats, setStats] = React.useState<DashboardStatsType>();
    const Views = stats?.totalViews || 0;
    const Subscribers = stats?.totalSubscribers || 0;
    const Likes = stats?.totalLikes || 0;
    const Comments = stats?.totalComments || 0;

    useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/dashboard/channel-stats",
        }).then((response) => {
            const statsData = (response as ResponseType).data?.stats;
            setStats(statsData);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        });
    }, [navigate]);

    return (
        <>
            {showUploadVideo &&
                <UploadVideoModal
                    setVideoName={setVideoName}
                    setVideoSize={setVideoSize}
                    setUploadProgress={setUploadProgress}
                    setShowUploadVideo={setShowUploadVideo}
                    setShowUploadingVideo={setShowUploadingVideo}
                />
            }
            {/* set true in uploading video modal */}
            {showUploadingVideo &&
                <UploadingVideoModal
                    videoName={videoName}
                    videoSize={videoSize}
                    uploadProgress={uploadProgress}
                    setShowUploadingVideo={setShowUploadingVideo}
                />
            }

            <div className="flex justify-between items-center">
                <div className="my-2">
                    <h1 className="text-xl font-bold text-primary-text">
                        Welcome to the dashboard
                    </h1>
                    <p className="text-sm text-primary-text2">
                        Here you can manage your videos
                    </p>
                </div>
                <button className="flex items-center justify-between bg-primary rounded-lg px-3 py-1 text-primary-text"
                    onClick={() => setShowUploadVideo(true)}>
                    <FaPlus />
                    <span className="pl-1">Upload Video</span>
                </button>
            </div>

            {/* Status */}
            {/* <div className="w-full grid grid-cols-4 gap-4 justify-items-center"> */}
            <div className="w-full grid gap-3 justify-between md:grid-cols-4 grid-cols-2">
                <div className="flex flex-col px-3 py-2 bg-background-tertiary rounded-xl border-2 border-primary-border max-w-xs w-full">
                    <div className='bg-background-secondary rounded-full w-fit p-0.5'>
                        <FaRegEye className="text-2xl text-primary-text p-1" />
                    </div>
                    <h3 className="text-xs mt-2 text-primary-text2">Total Views</h3>
                    <p className="text-xl font-semibold text-primary-text">{Views}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-tertiary rounded-xl border-2 border-primary-border max-w-xs w-full">
                    <div className='bg-background-secondary rounded-full w-fit p-0.5'>
                        <FaRegUser className="text-2xl text-primary-text p-1" />
                    </div>
                    <h3 className="text-xs mt-2 text-primary-text2">Total Subscribers</h3>
                    <p className="text-xl font-semibold text-primary-text">{Subscribers}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-tertiary rounded-xl border-2 border-primary-border max-w-xs w-full">
                    <div className='bg-background-secondary rounded-full w-fit p-0.5'>
                        <FaRegHeart className="text-2xl text-primary-text p-1" />
                    </div>
                    <h3 className="text-xs mt-2 text-primary-text2">Total Likes</h3>
                    <p className="text-xl font-semibold text-primary-text">{Likes}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-tertiary rounded-xl border-2 border-primary-border max-w-xs w-full">
                    <div className='bg-background-secondary rounded-full w-fit p-0.5'>
                        <BiCommentDetail className="text-2xl text-primary-text p-1" />
                    </div>
                    <h3 className="text-xs mt-2 text-primary-text2">Total Comments</h3>
                    <p className="text-xl font-semibold text-primary-text">{Comments}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardStats;
import React from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import UploadVideoModal from "../../components/Popup/UploadVideoModal";
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';
// import UploadingVideoModal from '../../components/Popup/UploadingVideoModal';


const DashboardStats: React.FC = () => {
    const navigate = useNavigate();
    const [showUploadVideo, setShowUploadVideo] = React.useState(false);
    // const [showUploadingVideo, setShowUploadingVideo] = React.useState(false);
    const [stats, setStats] = React.useState<any>({});

    const Views = stats?.totalViews || 100;
    const Subscribers = stats?.totalSubscribers || 100;
    const Likes = stats?.totalLikes || 100;
    const Comments = stats?.totalComments || 100;

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/dashboard/channel-stats",
        }).then((response: any) => {
            console.log("response:", response.data);
            setStats(response.data?.stats);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <>
            {showUploadVideo && <UploadVideoModal setShowUploadVideo={setShowUploadVideo} />}
            {/* set true in uploading video modal */}
            {/* {showUploadingVideo && <UploadingVideoModal setShowUploadingVideo={setShowUploadingVideo} />} */}

            <div className="flex justify-between items-center">
                <div className="my-2">
                    <h1 className="text-xl font-bold">
                        Welcome to the dashboard
                    </h1>
                    <p className="text-sm">
                        Here you can manage your videos
                    </p>
                </div>
                <button className="flex items-center justify-between bg-primary rounded-lg px-3 py-1"
                    onClick={() => setShowUploadVideo(true)}>
                    <FaPlus />
                    <span className="pl-1">Upload Video</span>
                </button>
            </div>

            {/* Status */}
            {/* <div className="w-full grid grid-cols-4 gap-4 justify-items-center"> */}
            <div className="w-full grid gap-3 justify-between md:grid-cols-4 grid-cols-2">
                <div className="flex flex-col px-3 py-2 bg-background-secondary rounded-xl border-2 max-w-xs w-full">
                    <FaRegEye className="text-2xl bg-white text-primary rounded-full p-1" />
                    <h3 className="text-xs mt-2 opacity-90">Total Views</h3>
                    <p className="text-xl font-semibold">{Views}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-secondary rounded-xl border-2 max-w-xs w-full">
                    <FaRegUser className="text-2xl bg-white text-primary rounded-full p-1" />
                    <h3 className="text-xs mt-2 opacity-90">
                        Total Subscribers
                    </h3>
                    <p className="text-xl font-semibold">{Subscribers}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-secondary rounded-xl border-2 max-w-xs w-full">
                    <FaRegHeart className="text-2xl bg-white text-primary rounded-full p-1" />
                    <h3 className="text-xs mt-2 opacity-90">Total Likes</h3>
                    <p className="text-xl font-semibold">{Likes}</p>
                </div>

                <div className="flex flex-col px-3 py-2 bg-background-secondary rounded-xl border-2 max-w-xs w-full">
                    <BiCommentDetail className="text-2xl bg-white text-primary rounded-full p-1" />
                    <h3 className="text-xs mt-2 opacity-90">
                        Total Comments
                    </h3>
                    <p className="text-xl font-semibold">{Comments}</p>
                </div>
            </div>
        </>
    )
}

export default DashboardStats;
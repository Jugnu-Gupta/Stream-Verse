import React from 'react';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import DashboardVideoStatsControl from "./DashboardVideoStatsControl";

const DashboardVideos: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<any[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/dashboard/channel-videos",
        }).then((response: any) => {
            console.log("videos:", response.data);
            setVideos(response.data?.videos);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <div className="overflow-x-auto mt-4">
            <table className="w-full text-white border-collapse">
                <thead>
                    <tr className="text-nowrap border-[1px] border-background-secondary">
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Toggle</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Status</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-full">Video</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Engagement</th>
                        <th className="px-4 py-2 text-center border-r border-background-secondary w-1/12">Upload Date</th>
                        <th className="px-4 py-2 text-center w-1/12">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos?.map((video: any) => (
                            <DashboardVideoStatsControl key={video._id} videoInfo={video} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DashboardVideos;
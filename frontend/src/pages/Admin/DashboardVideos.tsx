import React from 'react';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import DashboardVideoStatsControl from "./DashboardVideoStatsControl";
import { DashboardVideoType } from '../../Types/Dashboard.type';

const DashboardVideos: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<DashboardVideoType[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/dashboard/channel-videos",
        }).then((response: any) => { // eslint-disable-line
            console.log("videos:", response.data);
            setVideos(response.data?.videos);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse bg-background-tertiary">
                <thead>
                    <tr className="text-nowrap border-2 border-primary-border text-primary-text">
                        <th className="px-4 py-2 text-center border-x-2 border-primary-border w-1/12">Toggle</th>
                        <th className="px-4 py-2 text-center border-x-2 border-primary-border w-1/12">Status</th>
                        <th className="px-4 py-2 text-center border-x-2 border-primary-border w-full">Video</th>
                        <th className="px-4 py-2 text-center border-x-2 border-primary-border w-1/12">Engagement</th>
                        <th className="px-4 py-2 text-center border-x-2 border-primary-border w-1/12">Upload Date</th>
                        <th className="px-4 py-2 text-center w-1/12 border-x-2 border-primary-border">Edit</th>
                    </tr>
                </thead>
                <tbody className='text-primary-text'>
                    {videos?.map((video: DashboardVideoType) => (
                        <DashboardVideoStatsControl key={video._id} videoInfo={video} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardVideos;
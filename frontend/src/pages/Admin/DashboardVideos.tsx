import React from 'react';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import DashboardVideoStatsControl from "./DashboardVideoStatsControl";
import { DashboardVideoType } from '../../type/Dashboard.type';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';
import NoResultsFound from '../Search/NoResultsFound';
import loadingGIF from '../../assets/loading.gif';

interface DashboardVideosProps {
    rerender: number;
}
const DashboardVideos: React.FC<DashboardVideosProps> = ({ rerender }) => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<DashboardVideoType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [renderVideos, setRenderVideos] = React.useState<number>(0);

    React.useEffect(() => {
        setLoading(true);
        makeApiRequest({
            method: "get",
            url: "/api/v1/dashboard/channel-videos",
        }).then((response) => {
            const data = (response as ResponseType).data;
            setVideos(data?.videos);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        }).finally(() => {
            setLoading(false);
        });
    }, [navigate, rerender, renderVideos]);

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
                        <DashboardVideoStatsControl key={video._id} videoInfo={video} setRenderVideos={setRenderVideos} />
                    ))}
                </tbody>
            </table>
            {videos?.length === 0 && (!loading ?
                (<NoResultsFound entityName="video" style="mt-16"
                    heading="No videos uploaded" message="This page has yet to upload a video." />)
                : (<div className='w-full h-full flex justify-center items-center'>
                    <img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
                </div>)
            )}
        </div>
    )
}

export default DashboardVideos;
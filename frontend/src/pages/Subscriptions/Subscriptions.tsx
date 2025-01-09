import React from 'react';
import VideoCardView from '../Home/VideoCardView';
import VideoListView from '../Search/VideoListView';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import { VideoType } from '../../Types/Video.type';
import NoResultsFound from '../Search/NoResultsFound';

interface VideoWrapper {
    _id: string;
    video: VideoType;
}
const Subscriptions: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<VideoWrapper[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/subscriptions",
        }).then((response: any) => { // eslint-disable-line
            setVideos(response.data?.subscriptions);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (videos?.length === 0 ? <NoResultsFound style='mt-40' entityName="video"
        heading="No videos found" message="No videos found of any Subscribed channels." />
        : <div className="sm:flex m-2 max-w-full w-11/12 justify-items-center">
            <div className='sm:flex hidden flex-col'>
                {videos?.map((item: VideoWrapper) => (
                    <VideoListView key={item._id} videoInfo={item.video} />
                ))}
            </div>
            <div className='sm:hidden flex flex-col'>
                {videos?.map((item: VideoWrapper) => (
                    <VideoCardView key={item._id} videoInfo={item.video} />
                ))}
            </div>
        </div>
    )
}

export default Subscriptions;
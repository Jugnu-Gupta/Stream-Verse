import React from 'react';
import VideoCardView from '../Home/VideoCardView';
import VideoListView from '../Search/VideoListView';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import { VideoType } from '../../Types/Video.type';


// interface SubscriptionsChildProps {
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
            console.log("response:", response.data);
            setVideos(response.data?.subscriptions);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <div className="sm:grid m-2 max-w-full w-11/12 justify-items-center">
            <div className='sm:grid hidden'>
                {
                    videos?.map((item: VideoWrapper) => (
                        <VideoListView key={item?._id} videoInfo={item.video} />
                    ))
                }
            </div>
            <div className='sm:hidden grid'>
                {
                    videos?.map((item: VideoWrapper) => (
                        <VideoCardView key={item?._id} videoInfo={item.video} />
                    ))
                }
            </div>
        </div>
    )
}

export default Subscriptions;
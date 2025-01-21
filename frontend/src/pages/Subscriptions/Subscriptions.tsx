import React from 'react';
import VideoCardView from '../Home/VideoCardView';
import VideoListView from '../Search/VideoListView';
import { useNavigate } from 'react-router-dom';
import makeApiRequest from '../../utils/MakeApiRequest';
import { VideoType } from '../../type/Video.type';
import NoResultsFound from '../Search/NoResultsFound';
import loadingGIF from '../../assets/loading.gif';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';

interface VideoWrapper {
    _id: string;
    video: VideoType;
}
const Subscriptions: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<VideoWrapper[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoading(true);
        makeApiRequest({
            method: "get",
            url: "/api/v1/subscriptions",
        }).then((response) => {
            const data = (response as ResponseType).data;
            setVideos(data.subscriptions);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        }).finally(() => {
            setLoading(false);
        });
    }, [navigate]);

    return (videos?.length === 0 ?
        (!loading ? <NoResultsFound style='mt-40' entityName="video"
            heading="No videos found" message="No videos found of any Subscribed channels." />
            : (<div className='w-full h-full flex justify-center items-center'>
                <img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
            </div>))
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
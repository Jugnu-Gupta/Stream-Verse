import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';
import { VideoType } from '../../type/Video.type';
import NoResultsFound from '../Search/NoResultsFound';
import loadingGIF from '../../assets/loading.gif';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';

const WatchHistory: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<VideoType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoading(true);
        makeApiRequest({
            method: "get",
            url: "/api/v1/users/watch-history",
        }).then((response) => {
            const watchHistoryData = (response as ResponseType).data?.watchHistory;
            setVideos(watchHistoryData);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        }).finally(() => {
            setLoading(false);
        });
    }, [navigate]);

    return (videos?.length === 0 ?
        (!loading ? <NoResultsFound style='mt-40' entityName='video'
            heading='No Watch History' message="You haven't watched any video." />
            : (<div className='w-full h-full flex justify-center items-center'>
                <img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
            </div>))
        : <div className="sm:flex m-2 max-w-full w-11/12">
            <div className='sm:flex hidden flex-col'>
                {videos?.map((video: VideoType) => (
                    <VideoListView key={video._id} videoInfo={video} />
                ))}
            </div>
            <div className='sm:hidden flex flex-col'>
                {videos?.map((video: VideoType) => (
                    <VideoCardView key={video._id} videoInfo={video} />
                ))}
            </div>
        </div>
    )
}

export default WatchHistory;
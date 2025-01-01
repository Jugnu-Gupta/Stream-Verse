import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';
import { VideoType } from '../../Types/Video.type';
import NoResultsFound from '../Search/NoResultsFound';

const WatchHistory: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<VideoType[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/users/watch-history",
        }).then((response: any) => { // eslint-disable-line
            setVideos(response.data?.watchHistory);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (videos?.length === 0 ? <NoResultsFound style='mt-40' entityName='video'
        heading='No Watch History' message="You haven't watched any video." />
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
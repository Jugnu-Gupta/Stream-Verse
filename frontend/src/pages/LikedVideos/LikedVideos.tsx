import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';
import { VideoType } from '../../Types/Video.type';
import NoResultsFound from '../Search/NoResultsFound';

interface VideoWrapper {
    _id: string;
    video: VideoType;
}
const LikedVideos: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<VideoWrapper[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/likes/video",
        }).then((response: any) => { // eslint-disable-line
            setVideos(response.data?.likedVideos);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);


    return (videos?.length === 0 ? <NoResultsFound style='mt-40' entityName='video'
        heading='No videos found' message="You haven't liked any video." />
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

export default LikedVideos;
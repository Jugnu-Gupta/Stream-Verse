import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';
import { VideoType } from '../../Types/Video.type';

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
            console.log("data:", response.data);
            setVideos(response.data?.likedVideos);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);


    return (
        <div className="sm:flex m-2 max-w-full w-11/12 justify-items-center">
            <div className='sm:flex hidden flex-col'>
                {
                    videos?.map((item: VideoWrapper) => (
                        <VideoListView key={item._id} videoInfo={item.video} />
                    ))
                }
            </div>
            <div className='sm:hidden flex flex-col'>
                {
                    videos?.map((item: VideoWrapper) => (
                        <VideoCardView key={item._id} videoInfo={item.video} />
                    ))
                }
            </div>
        </div>
    )
}

export default LikedVideos;
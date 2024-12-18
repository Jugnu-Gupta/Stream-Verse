import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest from '../../utils/MakeApiRequest';
import { useNavigate } from 'react-router-dom';

const History: React.FC = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = React.useState<any[]>([]);

    React.useEffect(() => {
        makeApiRequest({
            method: "get",
            url: "/api/v1/users/watch-history",
        }).then((response: any) => {
            console.log("data:", response.data);
            setVideos(response.data?.watchHistory);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <div className="sm:grid m-2 max-w-full w-11/12 justify-items-center">
            <div className='sm:grid hidden'>
                {
                    videos?.map((video: any) => (
                        <VideoListView key={video._id} videoInfo={video} />
                    ))
                }
            </div>
            <div className='sm:hidden grid'>
                {
                    videos?.map((video: any) => (
                        <VideoCardView key={video._id} videoInfo={video} />
                    ))
                }
            </div>
        </div>
    )
}

export default History;
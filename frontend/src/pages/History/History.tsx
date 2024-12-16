import React from 'react';
import VideoListView from '../Search/VideoListView';
import VideoCardView from '../Home/VideoCardView';
import { useGetVideos } from '../../hooks/useGetVideos';

const History: React.FC = () => {
    const { videos } = useGetVideos({ method: "get", url: "/api/v1/users/watch-history" });

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
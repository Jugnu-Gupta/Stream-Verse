import React from 'react';
import VideoCardView from '../Home/VideoCardView';
import VideoListView from '../Search/VideoListView';
import { useGetVideos } from '../../hooks/useGetVideos';

const Subscriptions: React.FC = () => {
    const { videos } = useGetVideos({ method: "get", url: "/api/v1/subscriptions" });

    return (
        <div className="sm:grid m-2 max-w-full w-11/12 justify-items-center">
            <div className='sm:grid hidden'>
                {
                    videos?.map((item: any) => (
                        <VideoListView key={item?._id} videoInfo={item.video} />
                    ))
                }
            </div>
            <div className='sm:hidden grid'>
                {
                    videos?.map((item: any) => (
                        <VideoCardView key={item?._id} videoInfo={item.video} />
                    ))
                }
            </div>
        </div>
    )
}

export default Subscriptions;
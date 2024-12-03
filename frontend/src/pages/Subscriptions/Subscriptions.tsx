import React, { useEffect } from 'react';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import VideoCardView from '../Home/VideoCardView';
import makeApiRequest, { ApiRequestOptions } from '../../utils/MakeApiRequest';

const Subscriptions: React.FC = () => {
    const [videos, setVideos] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch subscriptions
        const getSubscriptions = async () => {
            const _id = localStorage.getItem("userId");

            if (!_id) navigate("/login");
            try {
                const request: ApiRequestOptions = {
                    method: "get",
                    url: `/api/v1/subscriptions/user/${_id}`,
                };
                const { data }: any = await makeApiRequest(request);
                console.log(data);

                // get subscriptions videos
                const requestVideos: ApiRequestOptions = {
                    method: "get",
                    url: `/api/v1/videos/subscriptions`,
                    data: { subscriptions: data.subscribers.map((subs: any) => subs.subscriberId) },
                };

                const { data: videos }: any = await makeApiRequest(requestVideos);
                console.log(videos);
                // set videos
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        getSubscriptions();
    }, [navigate]);

    return (
        <>
            <Search />
            {/* {
                videos.map((video: any) => (
                    <VideoCardView />
                ))
            } */}
        </>
    )
}

export default Subscriptions;
import React from 'react';
import ChannelHeader from '../pages/Channel/Header/ChannelHeader';
import makeApiRequest from '../utils/MakeApiRequest';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ChannelInfoType } from '../type/Channel.type';
import { ErrorType } from '../type/Error.type';
import { ResponseType } from '../type/Response.type';
import toast from 'react-hot-toast';

const ChannelLayout: React.FC = () => {
    const navigate = useNavigate();
    const { adminName } = useParams<string>();
    const [channelInfo, setChannelInfo] = React.useState<ChannelInfoType>();

    React.useEffect(() => {
        if (!adminName) {
            toast.error("Please login to view your channel.");
            navigate("/");
        }
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response) => {
            const data = (response as ResponseType).data;
            setChannelInfo(data);
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
            navigate("/");
        });
    }, [navigate, adminName]);

    return (
        <div className="w-full">
            <ChannelHeader channelInfo={channelInfo} />
            <Outlet context={{ channelInfo: channelInfo }} />
        </div>
    )
}

export default ChannelLayout;
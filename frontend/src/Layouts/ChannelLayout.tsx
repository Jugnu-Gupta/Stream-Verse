import React from 'react';
import ChannelHeader from '../pages/Channel/Header/ChannelHeader';
import makeApiRequest from '../utils/MakeApiRequest';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ChannelInfoType } from '../Types/Channel.type';

const ChannelLayout: React.FC = () => {
    const navigate = useNavigate();
    const { adminName } = useParams<string>();
    const [channelInfo, setChannelInfo] = React.useState<ChannelInfoType>();

    React.useEffect(() => {
        if (!adminName) navigate("/");
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response: any) => { // eslint-disable-line
            console.log("Fetched ChannelInfo2:", response.data);
            setChannelInfo(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
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
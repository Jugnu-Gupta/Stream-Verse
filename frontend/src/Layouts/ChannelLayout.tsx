import React from 'react';
import ChannelHeader from '../pages/Channel/Header/ChannelHeader';
import makeApiRequest from '../utils/MakeApiRequest';
import { useNavigate, useParams } from 'react-router-dom';

interface ChannelLayoutProps {
    children?: React.ReactNode;
}

interface ChannelChildProps {
    channelInfo?: any;
}

const ChannelLayout: React.FC<ChannelLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { adminName } = useParams<string>();
    const [channelInfo, setChannelInfo] = React.useState<any>();
    // console.log("adminName2:", channelInfo);

    React.useEffect(() => {
        if (!adminName) navigate("/");
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response: any) => {
            // console.log("Fetched ChannelInfo:", response.data);
            setChannelInfo(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate, adminName]);

    return (
        <div className="w-full">
            <ChannelHeader channelInfo={channelInfo} />
            {/* {children} */}
            {/* Passing the fetched channelInfo to the child */}
            {/* {React.Children.only(children) &&
                    ? React.cloneElement(child as React.ReactElement<ChannelChildProps>, { channelInfo })
            {/* Use React.Children.map to pass props to each child */}
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child as React.ReactElement<ChannelChildProps>, { channelInfo })
                    : child
            )}
        </div>
    )
}

export default ChannelLayout;
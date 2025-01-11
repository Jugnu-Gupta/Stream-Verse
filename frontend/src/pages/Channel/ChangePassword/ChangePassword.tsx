import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import ChannelInfo from '../Header/ChannelInfo';
import ChannelNavbar from '../Navbar/ChannelNavbar';
import { CHANNELNAVITEMS2 } from '../../../Constants/ChannelNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import makeApiRequest from '../../../utils/MakeApiRequest';
import { ChannelInfoType } from '../../../Types/Channel.type';

const ChangePassword: React.FC = () => {
    const { adminName } = useParams<{ adminName: string }>();
    const [channelInfo, setChannelInfo] = React.useState<ChannelInfoType>();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!adminName) navigate("/");
        makeApiRequest({
            method: "get",
            url: `/api/v1/users/channel/${adminName?.substring(1)}`,
        }).then((response: any) => { // eslint-disable-line
            setChannelInfo(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate, adminName]);

    return (
        <div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
            <ChannelInfo channelInfo={channelInfo} />
            <ChannelNavbar entityType="user" channelNavItems={CHANNELNAVITEMS2} />

            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full max-w-6xl mx-auto mt-4" >
                <div className='md:w-full sm:w-3/4 w-full'>
                    <h2 className='font-semibold text-sm text-primary-text'>Password</h2>
                    <p className='text-sm text-primary-text2'>Please enter your current password to change your password.</p>
                </div>
                <div className='mb-4 w-full'>
                    <ChangePasswordForm email={channelInfo?.email} />
                </div>
            </div >
        </div>
    );
};

export default ChangePassword;
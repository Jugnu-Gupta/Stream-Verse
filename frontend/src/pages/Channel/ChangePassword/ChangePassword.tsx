import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import ChannelInfo from '../Header/ChannelInfo';
import ChannelNavbar from '../Navbar/ChannelNavbar';
import { CHANNELNAVITEMS2 } from '../../../Constants/ChannelNavbar';

const ChangePassword: React.FC = () => {
    return (
        <div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
            <ChannelInfo />
            <ChannelNavbar channelNavItems={CHANNELNAVITEMS2} />

            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full max-w-6xl mx-auto mt-4" >
                <div className='text-white md:w-full sm:w-3/4 w-full'>
                    <h2 className='font-semibold text-sm'>Password</h2>
                    <p className='text-sm text-gray-300'>Please enter your current password to change your paswword</p>
                </div>
                <div className='mb-4 w-full'>
                    <ChangePasswordForm />
                </div>
            </div >
        </div>
    );
};

export default ChangePassword;
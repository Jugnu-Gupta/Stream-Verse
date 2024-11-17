import React from 'react';
import ChannelHeader from '../pages/Channel/Header/ChannelHeader';

interface ChannelLayoutProps {
    children?: React.ReactNode;
}

const ChannelLayout: React.FC<ChannelLayoutProps> = ({ children }) => {
    return (
        <div className="w-full">
            <ChannelHeader />
            {children}
        </div>
    )
}

export default ChannelLayout;
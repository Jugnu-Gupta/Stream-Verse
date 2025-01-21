import React from "react";
import ChannelNavbar from "../Navbar/ChannelNavbar";
import ChannelInfo from "./ChannelInfo";
import CHANNELNAVITEMS from "../../../Constants/ChannelNavbar";
import { ChannelInfoType } from "../../../type/Channel.type";

interface ChannelHeaderProps {
	channelInfo: ChannelInfoType | undefined;
}
const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channelInfo }) => {
	return (
		<div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
			<ChannelInfo channelInfo={channelInfo} />
			<ChannelNavbar entityType="channel" channelNavItems={CHANNELNAVITEMS} />
		</div>
	);
};

export default ChannelHeader;

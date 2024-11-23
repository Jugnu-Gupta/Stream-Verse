import React from "react";
import ChannelNavbar from "../Navbar/ChannelNavbar";
import ChannelInfo from "./ChannelInfo";
import CHANNELNAVITEMS from "../../../Constants/ChannelNavbar";

const ChannelHeader: React.FC = () => {
	return (
		<div className="flex flex-col px-6 xs:px-2 w-full mt-4 max-w-6xl mx-auto">
			<ChannelInfo />
			<ChannelNavbar channelNavItems={CHANNELNAVITEMS} />
		</div>
	);
};

export default ChannelHeader;

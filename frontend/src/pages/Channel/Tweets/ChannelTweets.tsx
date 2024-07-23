import React from "react";
import ChannelTweetList from "./ChannelTweetList";

const ChannelTweets: React.FC = () => {
	return (
		<div className="grid px-4 pt-4 w-full justify-items-center grid-cols-1">
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
			<ChannelTweetList />
		</div>
	);
};

export default ChannelTweets;

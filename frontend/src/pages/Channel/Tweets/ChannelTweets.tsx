import React from "react";
import ChannelTweetList from "./ChannelTweetList";

const ChannelTweets: React.FC = () => {
	return (
		<div className="px-4 pt-4 w-full flex justify-center flex-col gap-4">
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

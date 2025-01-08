import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { formatNumber } from "../../../utils/FormatNumber";
import { SubscribedChannelType } from "../../../Types/Channel.type";


interface ChannelSubscribedCardsProps {
	SubscribedChannel: SubscribedChannelType;
}
const ChannelSubscribedCards: React.FC<ChannelSubscribedCardsProps> = ({ SubscribedChannel }) => {
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const channelName = SubscribedChannel?.fullName || "Channel Name";
	const subscribers = formatNumber(SubscribedChannel?.totalSubscribers);
	const channelUserName = SubscribedChannel?.userName || "Channel User Name";

	return (
		<div className="flex items-center gap-2 p-2 w-full">
			<Link to={`/@${channelUserName}/videos`}>
				<div className="overflow-hidden rounded-full w-10">
					<img src={thumbnail} alt="thumbnail" loading='lazy'
						className="rounded-full w-10 aspect-square"
					/>
				</div>
			</Link>
			<div className="flex justify-between items-center w-full">
				<div className="flex flex-col gap-1">
					<p className="text-sm font-semibold text-primary-text">{channelName}</p>
					<p className="text-primary-text2 text-xs">
						{subscribers} Subscribers
					</p>
				</div>
				<div>
					<button
						onClick={() => setIsSubscribed(!isSubscribed)}
						className={twMerge(
							"bg-subscribe text-primary-text font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:scale-105 duration-300",
							isSubscribed && "bg-primary"
						)}>
						{isSubscribed ? "Subscribed" : "Subscribe"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChannelSubscribedCards;

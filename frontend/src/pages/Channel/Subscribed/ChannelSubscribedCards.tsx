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

	return (
		<div className="flex items-center gap-2 p-2 w-full">
			<Link to="/register">
				<div className="overflow-hidden rounded-full w-10">
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-full w-10 aspect-square"
					/>
				</div>
			</Link>
			<div className="flex text-white justify-between items-center w-full">
				<div className="flex flex-col items-center gap-1">
					<p className="text-sm font-semibold">{channelName}</p>
					<p className="text-primary-text text-xs">
						{subscribers} Subscribers
					</p>
				</div>
				<div>
					{isSubscribed ? (
						<button
							onClick={() => setIsSubscribed(!isSubscribed)}
							className={twMerge(
								"bg-primary text-white font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md hover:bg-white hover:text-primary duration-300",
								isSubscribed && "bg-opacity-75"
							)}>
							Subscribed
						</button>
					) : (
						<button
							onClick={() => setIsSubscribed(!isSubscribed)}
							className={twMerge(
								"bg-white text-primary font-semibold px-4 py-1 mt-4 xs:px-3 xs:text-sm rounded-md duration-300",
								isSubscribed && "bg-opacity-75"
							)}>
							Subscribe
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChannelSubscribedCards;

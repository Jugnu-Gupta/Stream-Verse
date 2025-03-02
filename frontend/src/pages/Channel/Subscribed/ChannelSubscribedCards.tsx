import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { SubscribedChannelType } from "../../../type/Channel.type";
import { generateAvatar } from "../../../utils/GenerateAvatar";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { ErrorType } from "../../../type/Error.type";
import { computeSubscriberCount } from "../../../utils/ComputeSubscriberCount";
import toast from "react-hot-toast";

interface ChannelSubscribedCardsProps {
	SubscribedChannel: SubscribedChannelType;
}
const ChannelSubscribedCards: React.FC<ChannelSubscribedCardsProps> = ({ SubscribedChannel }) => {
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const channelName = SubscribedChannel.fullName;
	const channelUserName = SubscribedChannel.userName;
	const avatar = SubscribedChannel.avatar?.url || generateAvatar(channelName, "0078e1", "ffffffcc", 50);
	const subscribers = computeSubscriberCount(SubscribedChannel?.totalSubscribers, SubscribedChannel?.isSubscribed, isSubscribed);

	const handleSubscribe = () => {
		makeApiRequest({
			method: "post",
			url: `/api/v1/subscriptions/toggle/${SubscribedChannel?._id}`,
		}).then(() => {
			setIsSubscribed(!isSubscribed);
		}).catch((error: ErrorType) => {
			if (error.response.data.statusCode === 401) {
				toast.error("Please login to subscribe");
			}
			console.log(error.response.data.message);
		});
	}

	useEffect(() => {
		setIsSubscribed(SubscribedChannel?.isSubscribed || false);
	}, [SubscribedChannel]);

	return (
		<div className="flex items-center gap-2 p-2 w-full">
			<Link to={`/channel/@${channelUserName}/videos`}>
				<div className="overflow-hidden rounded-full w-10">
					<img src={avatar} alt="avatar" loading='lazy'
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
						onClick={handleSubscribe}
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

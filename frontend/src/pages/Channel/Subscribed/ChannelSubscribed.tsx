import React from "react";
import ChannelSubcribedCards from "./ChannelSubscribedCards";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate, useOutletContext } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { ChannelInfoType, SubscribedChannelType } from "../../../Types/Channel.type";

interface SubscribedChannelWrapper {
	_id: string;
	channel: SubscribedChannelType;
}
interface ChannelInfoWrapper {
	channelInfo: ChannelInfoType;
}
const ChannelSubscribed: React.FC = () => {
	const [subscribedChannels, setSubscribedChannels] = React.useState<SubscribedChannelType[]>([]);
	const [filteredChannels, setFilteredChannels] = React.useState<SubscribedChannelType[]>([]);
	const [searchValue, setSearchValue] = React.useState<string>("");
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const navigate = useNavigate();
	const channelId = channelInfo?._id;

	React.useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/subscriptions/channel/${channelId}`,
		}).then((response: any) => { // eslint-disable-line
			const channels = response.data?.subscribedChannels.reduce(
				(acc: SubscribedChannelType[], item: SubscribedChannelWrapper) => {
					acc.push(item.channel);
					return acc;
				}, []);
			setSubscribedChannels(channels);
			setFilteredChannels(channels);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			navigate("/");
		});
	}, [navigate, channelId]);

	const handleSearch = () => {
		const filtered = subscribedChannels.reduce((acc: SubscribedChannelType[], channel: SubscribedChannelType) => {
			if (channel.fullName.toLowerCase().includes(searchValue)) {
				acc.push(channel);
			}
			return acc;
		}, []);
		setFilteredChannels(filtered);
	}

	return (
		<div className="px-4 mt-4 w-full flex flex-col mx-auto max-w-6xl">
			<div className="flex items-center border-2 border-primary-border bg-primary-text rounded-full w-[calc(100%-16px)] mx-auto mb-4">
				<input
					type="text"
					value={searchValue}
					placeholder="Search"
					onChange={(e) => setSearchValue(e.target.value)}
					className="outline-none rounded-l-full pl-3 py-1 w-full bg-transparent text-primary"
					required
				/>
				<button onClick={handleSearch}
					className="h-full pr-2 pl-1 rounded-r-full bg-transparent cursor-pointer outline-none">
					<IoSearchSharp className="text-xl h-full text-primary" />
				</button>
			</div>
			<div className="w-full">
				{
					filteredChannels?.map((channel: SubscribedChannelType) => (
						<ChannelSubcribedCards key={channel._id} SubscribedChannel={channel} />
					))
				}
			</div>
		</div>
	);
};

export default ChannelSubscribed;

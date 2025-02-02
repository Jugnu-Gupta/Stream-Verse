import React from "react";
import ChannelSubcribedCards from "./ChannelSubscribedCards";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate, useOutletContext } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { ChannelInfoType, SubscribedChannelType } from "../../../type/Channel.type";
import NoResultsFound from "../../Search/NoResultsFound";
import loadingGIF from "../../../assets/loading.gif";
import { ErrorType } from "../../../type/Error.type";
import { ResponseType } from "../../../type/Response.type";
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
	const [loading, setLoading] = React.useState<boolean>(true);
	const [searchValue, setSearchValue] = React.useState<string>("");
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const userId = localStorage.getItem("userId");
	const navigate = useNavigate();
	const channelId = channelInfo?._id;

	React.useEffect(() => {
		if (!channelId) return;

		makeApiRequest({
			method: "get",
			url: `/api/v1/subscriptions/channel/${channelId}`,
			params: { userId },
		}).then((response) => {
			const data = (response as ResponseType).data;
			const channels = data?.subscribedChannels.reduce(
				(acc: SubscribedChannelType[], item: SubscribedChannelWrapper) => {
					acc.push(item.channel);
					return acc;
				}, []);
			setSubscribedChannels(channels);
			setFilteredChannels(channels);
			console.log(channels);
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
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

	return (filteredChannels.length === 0 ?
		(!loading ? <NoResultsFound style="mt-16" entityName="subscriber"
			heading="No people subscribed" message="This channel has yet to subscribe a new channel." />
			: (<div className='w-full h-full flex justify-center items-center'>
				<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
			</div>))
		: <div className="px-4 mt-4 w-full flex flex-col mx-auto max-w-6xl">
			<div className="flex items-center border-2 border-primary-border bg-primary-text rounded-full w-[calc(100%-16px)] mx-auto mb-4">
				<input type="text"
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
				{filteredChannels?.map((channel: SubscribedChannelType) => (
					<ChannelSubcribedCards key={channel._id} SubscribedChannel={channel} />
				))}
			</div>
		</div>
	);
};

export default ChannelSubscribed;

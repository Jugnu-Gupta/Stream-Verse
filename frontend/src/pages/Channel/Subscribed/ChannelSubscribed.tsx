import React from "react";
import ChannelSubcribedCards from "./ChannelSubscribedCards";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate, useOutletContext } from "react-router-dom";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { ChannelInfoType } from "../../../Types/Channel";

interface ChannelInfoWrapper {
	channelInfo: ChannelInfoType;
}
const ChannelSubscribed: React.FC = () => {
	const [subscribedChannels, setSubscribedChannels] = React.useState<any[]>([]);
	const { channelInfo }: ChannelInfoWrapper = useOutletContext();
	const navigate = useNavigate();
	const channelId = channelInfo?._id;

	React.useEffect(() => {
		makeApiRequest({
			method: "get",
			url: `/api/v1/subscriptions/channel/${channelId}`,
		}).then((response: any) => {
			setSubscribedChannels(response.data?.subscribedChannels);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			navigate("/");
		});
	}, [navigate, channelId]);

	return (
		<div className="px-4 mt-4 w-full flex flex-col mx-auto max-w-6xl">
			<div className="flex items-center border-2 border-white rounded-full bg-white w-[calc(100%-16px)] mx-auto">
				<input
					type="text"
					placeholder="Search"
					className="outline-none rounded-l-full pl-3 py-1 w-full"
					required
				/>
				<div className="h-full pr-2 pl-1 rounded-r-full bg-white cursor-pointer">
					<IoSearchSharp className="text-xl h-full text-primary" />
				</div>
			</div>
			<div className="w-full">
				{
					subscribedChannels?.map((item: any) => (
						<ChannelSubcribedCards key={item.channel._id} channelInfo={item.channel} />
					))
				}
			</div>
		</div>
	);
};

export default ChannelSubscribed;

import React from "react";
import ChannelSubcribedCards from "./ChannelSubscribedCards";
import { IoSearchSharp } from "react-icons/io5";

const ChannelSubscribed: React.FC = () => {
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
			<ChannelSubcribedCards />
			<ChannelSubcribedCards />
			<ChannelSubcribedCards />
			<ChannelSubcribedCards />
			<ChannelSubcribedCards />
			<ChannelSubcribedCards />
		</div>
	);
};

export default ChannelSubscribed;

import React, { useEffect } from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import { PiFolder } from "react-icons/pi";
import makeApiRequest, { ApiRequestOptions } from "../../../utils/MakeApiRequest";


const ChannelPlaylists: React.FC = () => {
	const [playlists, setPlaylists] = React.useState([]);
	const channelAdmin = localStorage.getItem("userName");

	useEffect(() => {
		// fetch playlists
		const getPlaylists = async () => {
			const request: ApiRequestOptions = {
				method: "get",
				url: `/api/v1/playlists?userId=${channelAdmin}`,
			};

			const { data }: any = await makeApiRequest(request);
			console.log(data);
			setPlaylists(data.playlists);
		}
		// setPlaylists([]);
		getPlaylists();
	}, [channelAdmin]);

	if (playlists.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center text-center text-white px-4 w-full max-w-6xl mx-auto mt-4 z-0 mb-4">
				<PiFolder className="text-4xl text-primary bg-blue-100 rounded-full p-1.5" />
				<h1 className="text-md font-semibold">No Playlists Created</h1>
				<p className="text-sm">There are no playlist created on this channel.</p>
			</div>
		);
	}

	return (
		< div className="grid px-4 w-full max-w-6xl mx-auto justify-items-center mt-4 z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1" >
			{
				playlists.map((playlist: any) => (
					<ChannelPlaylistCard key={playlist._id} playlist={playlist} />
				))
			}
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
			<ChannelPlaylistCard />
		</div >
	);
};

export default ChannelPlaylists;

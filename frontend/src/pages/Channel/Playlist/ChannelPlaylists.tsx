import React from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistType } from "../../../Types/Platlist.type";
// import NoPlaylistFound from "../../Playlists/NoPlaylistFound";
import NoResultsFound from "../../Search/NoResultsFound";

const ChannelPlaylists: React.FC = () => {
	const [playlists, setPlaylists] = React.useState<PlaylistType[]>([]);
	const navigate = useNavigate();
	const { adminName } = useParams<{ adminName: string }>();

	React.useEffect(() => {
		if (!adminName) navigate("/");
		const userName = adminName?.substring(1);

		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists`,
			params: { userName },
		}).then((response: any) => { // eslint-disable-line
			console.log("channelsResponse playlists:", response.data);
			setPlaylists(response.data?.playlists);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		});
	}, [navigate, adminName]);

	return (playlists?.length === 0 ? <NoResultsFound entityName="playlist" style="mt-16"
		heading="No playlist created" message="There are no playlist created on this channel." />
		: < div className="grid px-4 w-full max-w-6xl mx-auto justify-items-center z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 mt-4" >
			{playlists?.map((playlist: PlaylistType) => (
				<ChannelPlaylistCard key={playlist._id} playlist={playlist} />
			))}
		</div >
	);
};

export default ChannelPlaylists;

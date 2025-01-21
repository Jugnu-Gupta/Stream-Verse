import React from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import makeApiRequest from "../../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistType } from "../../../type/Platlist.type";
import NoResultsFound from "../../Search/NoResultsFound";
import loadingGIF from "../../../assets/loading.gif";
import { ErrorType } from "../../../type/Error.type";
import { ResponseType } from "../../../type/Response.type";

const ChannelPlaylists: React.FC = () => {
	const [playlists, setPlaylists] = React.useState<PlaylistType[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const { adminName } = useParams<{ adminName: string }>();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!adminName) navigate("/");
		const userName = adminName?.substring(1);

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists`,
			params: { userName },
		}).then((response) => {
			const playlistsdata = (response as ResponseType).data?.playlists;
			setPlaylists(playlistsdata);
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	}, [navigate, adminName]);

	return (playlists?.length === 0 ?
		(!loading ? <NoResultsFound entityName="playlist" style="mt-16"
			heading="No playlist created" message="There are no playlist created on this channel." />
			: (<div className='w-full h-full flex justify-center items-center'>
				<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
			</div>))
		: < div className="grid px-4 w-full max-w-6xl mx-auto justify-items-center z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 mt-4" >
			{playlists?.map((playlist: PlaylistType) => (
				<ChannelPlaylistCard key={playlist._id} playlist={playlist} />
			))}
		</div >
	);
};

export default ChannelPlaylists;

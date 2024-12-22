import React from "react";
import PlaylistCard from "./PlaylistCard";
import { PiFolder } from "react-icons/pi";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { PlaylistType } from "../../Types/Platlist.type";

const Playlists: React.FC = () => {
	const [playlists, setPlaylists] = React.useState<PlaylistType[]>([]);
	const navigate = useNavigate();
	const { adminName } = useParams<{ adminName: string }>();

	React.useEffect(() => {
		const userName = (adminName ? adminName.substring(1) : localStorage.getItem("userName"));
		if (!userName) navigate("/");
		console.log("userName:", userName);

		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists?userName=${userName}`,
		}).then((response: any) => { // eslint-disable-line
			console.log("channelsResponse playlists:", response.data);
			setPlaylists(response.data?.playlists);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			// navigate("/");
		});
	}, [navigate, adminName]);

	if (playlists?.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center text-center text-primary-text px-4 w-full max-w-6xl mx-auto mt-4 z-0 mb-4">
				<PiFolder className="text-4xl text-primary bg-blue-100 rounded-full p-1.5" />
				<h1 className="text-md font-semibold">No Playlists Created</h1>
				<p className="text-sm">There are no playlist created on this channel.</p>
			</div>
		);
	}

	return (
		< div className={twMerge("grid px-4 w-full max-w-6xl mx-auto justify-items-center z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1", adminName ? "mt-4" : "mt-2")} >
			{
				playlists?.map((playlist: PlaylistType) => (
					<PlaylistCard key={playlist._id} playlist={playlist} />
				))
			}
		</div >
	);
};

export default Playlists;

import React, { useEffect } from "react";
import PlaylistCard from "./PlaylistCard";
import { PiFolder } from "react-icons/pi";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate } from "react-router-dom";
import { PlaylistType } from "../../Types/Platlist.type";
import DeleteVideoModal from "../../components/Popup/DeleteVideoModal";
import { EditDeleteType } from "../../Types/EditDelete.type";

const Playlists: React.FC = () => {
	const navigate = useNavigate();
	const [playlists, setPlaylists] = React.useState<PlaylistType[]>([]);
	const [editDeleteOption, setEditDeleteOption] = React.useState<EditDeleteType>(
		{ currentId: "", showEditModal: false, showDeleteModal: false, showEditDeletePopup: false });

	const setShowDeleteModal = (value: boolean) => {
		if (value) { // delete playlist
			setPlaylists(prev => prev.filter(playlist => playlist._id !== editDeleteOption.currentId));
			setEditDeleteOption({ ...editDeleteOption, currentId: "", showDeleteModal: false });
		} else {
			setEditDeleteOption({ ...editDeleteOption, showDeleteModal: value });
		}
	};

	useEffect(() => {
		const userName = localStorage.getItem("userName");
		if (!userName) navigate("/");

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
	}, [navigate]);

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
		< div className="grid px-4 w-full h-fit max-w-6xl justify-items-center mx-auto z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 mt-2" >
			{editDeleteOption.showDeleteModal && <DeleteVideoModal Name="Playlist" Url={`/api/v1/playlists/${editDeleteOption.currentId}`} setShowDeleteModal={setShowDeleteModal} />}

			{playlists?.map((playlist: PlaylistType) => (
				<PlaylistCard key={playlist._id} playlist={playlist} editDeleteOption={editDeleteOption} setEditDeleteOption={setEditDeleteOption} />
			))}
		</div >
	);
};

export default Playlists;

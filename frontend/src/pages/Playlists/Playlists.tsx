import React, { useEffect } from "react";
import PlaylistCard from "./PlaylistCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate } from "react-router-dom";
import { PlaylistType } from "../../Types/Platlist.type";
import DeleteModal from "../../components/Popup/DeleteModal";
import { EditDeleteType } from "../../Types/EditDelete.type";
import NoResultsFound from "../Search/NoResultsFound";

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
			url: `/api/v1/playlists`,
			params: { userName },
		}).then((response: any) => { // eslint-disable-line
			setPlaylists(response.data?.playlists);
		}).catch((error) => {
			console.error("Error fetching data:", error);
			navigate("/");
		});
	}, [navigate]);

	return (playlists.length === 0 ? <NoResultsFound style="mt-40" entityName="playlist" heading="No playlists found" message="You haven't created any playlist." />
		: < div className="grid px-4 w-full h-fit max-w-7xl justify-items-center mx-auto z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 mt-2" >
			{editDeleteOption.showDeleteModal && <DeleteModal Name="Playlist" Url={`/api/v1/playlists/${editDeleteOption.currentId}`} setShowDeleteModal={setShowDeleteModal} />}

			{playlists?.map((playlist: PlaylistType) => (
				<PlaylistCard key={playlist._id} playlist={playlist} editDeleteOption={editDeleteOption} setEditDeleteOption={setEditDeleteOption} />
			))}
		</div >
	);
};

export default Playlists;

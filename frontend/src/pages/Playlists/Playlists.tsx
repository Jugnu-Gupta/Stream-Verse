import React, { useEffect } from "react";
import PlaylistCard from "./PlaylistCard";
import makeApiRequest from "../../utils/MakeApiRequest";
import { useNavigate } from "react-router-dom";
import { PlaylistType } from "../../type/Platlist.type";
import DeleteModal from "../../components/Popup/DeleteModal";
import { EditDeleteType } from "../../type/EditDelete.type";
import NoResultsFound from "../Search/NoResultsFound";
import loadingGIF from "../../assets/loading.gif";
import { ErrorType } from "../../type/Error.type";
import { ResponseType } from "../../type/Response.type";
import toast from "react-hot-toast";

const Playlists: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(false);
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

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/playlists`,
			params: { userName },
		}).then((response) => {
			const playlistData = (response as ResponseType).data?.playlists;
			setPlaylists(playlistData);
		}).catch((error: ErrorType) => {
			console.error(error.response.data.message);
			if (error.response.data.statusCode == 401) {
				toast.error("Please login to view your playlists.");
			}
			navigate("/");
		}).finally(() => {
			setLoading(false);
		});
	}, [navigate]);

	return (playlists.length === 0 ?
		(!loading ? <NoResultsFound style="mt-40" entityName="playlist" heading="No playlists found" message="You haven't created any playlist." />
			: (<div className='w-full h-full flex justify-center items-center'>
				<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
			</div>))
		: < div className="grid px-4 w-full h-fit max-w-7xl justify-items-center mx-auto z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1 mt-2" >
			{editDeleteOption.showDeleteModal && <DeleteModal Name="Playlist" currPath={[]} Url={`/api/v1/playlists/${editDeleteOption.currentId}`} setShowDeleteModal={setShowDeleteModal} />}

			{playlists?.map((playlist: PlaylistType) => (
				<PlaylistCard key={playlist._id} playlist={playlist} editDeleteOption={editDeleteOption} setEditDeleteOption={setEditDeleteOption} />
			))}
		</div >
	);
};

export default Playlists;

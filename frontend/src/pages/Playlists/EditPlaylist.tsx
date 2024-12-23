import React, { Dispatch, SetStateAction } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import makeApiRequest from '../../utils/MakeApiRequest';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from 'react-hot-toast';

interface EditPlaylistProps {
    playlistId: string;
    playlist_Name: string;
    updatePlaylistName: Dispatch<SetStateAction<string>>;
}
const EditPlaylist: React.FC<EditPlaylistProps> = ({ playlistId, playlist_Name, updatePlaylistName }) => {
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showEditDeletePopup, setShowEditDeletePopup] = React.useState(false);
    const [playlistName, setPlaylistName] = React.useState<string>(playlist_Name);

    const handleDeletePlaylist = () => {
        makeApiRequest({
            method: "delete",
            url: `/api/v1/playlists/${playlistId}`,
        }).then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const handleEditPlaylist = () => {
        makeApiRequest({
            method: "patch",
            url: `/api/v1/playlists/${playlistId}`,
            data: {
                name: playlistName
            }
        }).then(() => {
            toast.success("Playlist updated successfully");
            updatePlaylistName(playlistName);
            handleOptions();
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const handleOptions = () => {
        setShowEditDeletePopup(!showEditDeletePopup);
        setShowEditModal(false);
    }
    return (
        <div className="absolute right-0 top-0 cursor-pointer text-primary-text">
            <BsThreeDotsVertical onClick={handleOptions} className='text-3xl hover:bg-primary rounded-full p-1.5' />

            {showEditDeletePopup && (
                <div className="absolute z-10 rounded-lg bg-background-primary text-primary-text cursor-auto top-10 right-0 border-primary-border border-2">
                    <button className="text-sm font-semibold flex items-center gap-2 hover:bg-primary px-3 py-1 w-full"
                        onClick={() => setShowEditModal(true)}>
                        <MdDriveFileRenameOutline /> <span>Edit</span>
                    </button>
                    <button className="text-sm font-semibold flex items-center gap-2 mt-2 hover:bg-primary px-3 py-1 w-full"
                        onClick={() => handleDeletePlaylist()}>
                        <RiDeleteBinLine /> <span>Delete</span>
                    </button>
                </div >
            )}
            {showEditModal && (<div className="absolute z-10 p-4 rounded-lg bg-background-primary text-primary-text cursor-auto top-10 right-0 border-primary-border border-2">
                <h3 className="text-sm font-semibold text-nowrap text-center">
                    Edit Playlist
                </h3>

                <div className="w-full text-xs mt-3">
                    <h3 className="text-start mb-1">
                        Name
                    </h3>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="rounded-md p-1 mb-1 outline-none text-black font-semibold"
                        placeholder="Playlist name"
                    />
                    <button className="bg-primary text-primary-text outline-none font-semibold px-3 py-1 xs:text-sm rounded-md mt-2 w-full"
                        onClick={handleEditPlaylist}>
                        Save Changes
                    </button>
                </div>
            </div >)}
        </div>
    )
}

export default EditPlaylist;
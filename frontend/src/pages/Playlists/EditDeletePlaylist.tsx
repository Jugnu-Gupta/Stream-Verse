import React, { Dispatch, SetStateAction } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import makeApiRequest from '../../utils/MakeApiRequest';
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from 'react-hot-toast';
import { EditDeleteWrapper } from "../../Types/EditDelete.type";

interface EditPlaylistProps extends EditDeleteWrapper {
    playlistId: string;
    playlist_Name: string;
    updatePlaylistName: Dispatch<SetStateAction<string>>;
}
const EditDeletePlaylist: React.FC<EditPlaylistProps> = ({ playlistId, playlist_Name, updatePlaylistName, editDeleteOption, setEditDeleteOption }) => {
    const [playlistName, setPlaylistName] = React.useState<string>(playlist_Name);

    const handleEditPlaylist = () => {
        if (playlistName === "" || playlistId === "") return;

        makeApiRequest({
            method: "patch",
            url: `/api/v1/playlists/${playlistId}`,
            data: {
                name: playlistName
            }
        }).then(() => {
            toast.success("Playlist updated successfully");
            updatePlaylistName(playlistName);
            setEditDeleteOption({ ...editDeleteOption, showEditModal: true });
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    const handleOptions = (playlistId: string) => {
        if (editDeleteOption.currentId === playlistId) {
            setEditDeleteOption({
                currentId: "",
                showEditModal: false,
                showDeleteModal: false,
                showEditDeletePopup: false
            });
            setPlaylistName(playlist_Name);
        } else {
            setEditDeleteOption({
                currentId: playlistId,
                showEditModal: false,
                showDeleteModal: false,
                showEditDeletePopup: true
            });
        }
    }

    return (<div className="absolute right-0 top-0 cursor-pointer text-primary-text">
        <BsThreeDotsVertical onClick={() => handleOptions(playlistId)} className='text-3xl hover:bg-primary rounded-full p-1.5' />

        {(editDeleteOption.currentId === playlistId && editDeleteOption.showEditDeletePopup) && (
            <div className="absolute z-10 rounded-lg bg-background-primary text-primary-text cursor-auto bottom-10 right-0 border-primary-border border-2">
                <button className="text-sm font-semibold flex items-center gap-2 hover:bg-primary px-3 py-1 w-full"
                    onClick={() => setEditDeleteOption({ ...editDeleteOption, showEditModal: true })}>
                    <MdDriveFileRenameOutline /> <span>Edit</span>
                </button>
                <button className="text-sm font-semibold flex items-center gap-2 mt-2 hover:bg-primary px-3 py-1 w-full"
                    onClick={() => setEditDeleteOption({ ...editDeleteOption, showDeleteModal: true })}>
                    <RiDeleteBinLine /> <span>Delete</span>
                </button>
            </div>
        )}

        {editDeleteOption.currentId === playlistId && editDeleteOption.showEditModal &&
            (<div className="absolute z-10 p-4 rounded-lg bg-background-primary text-primary-text cursor-auto bottom-10 right-0 border-primary-border border-2">
                <h3 className="text-sm font-semibold text-nowrap text-center">
                    Edit Playlist
                </h3>

                <div className="w-full text-xs mt-3">
                    <h3 className="text-start mb-1">Name</h3>
                    <input type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="rounded-md p-1 mb-1 outline-none text-black font-semibold"
                        placeholder="Playlist name"
                    />
                    <button className="bg-primary text-primary-text outline-none font-semibold px-3 py-1 xs:text-sm rounded-md mt-2 w-full border-2 border-primary-border"
                        onClick={handleEditPlaylist}>
                        Save Changes
                    </button>
                </div>
            </div>)
        }
    </div>)
}

export default EditDeletePlaylist;
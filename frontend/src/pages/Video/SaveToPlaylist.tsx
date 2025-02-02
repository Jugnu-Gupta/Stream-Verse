import React, { useEffect, Dispatch, SetStateAction } from 'react';
import makeApiRequest from '../../utils/MakeApiRequest';
import { PlaylistType } from '../../type/Platlist.type';
import toast from 'react-hot-toast';
import { ErrorType } from '../../type/Error.type';
import { ResponseType } from '../../type/Response.type';

interface UserPlatlistsType {
    id: string;
    name: string;
    videoStatus: boolean;
}
interface SaveToPlaylistProps {
    videoId: string;
    setShowSaveToPlaylist: Dispatch<SetStateAction<boolean>>;
}
const SaveToPlaylist: React.FC<SaveToPlaylistProps> = ({ videoId, setShowSaveToPlaylist }) => {
    const [playlists, setPlaylists] = React.useState<UserPlatlistsType[]>([]);
    const [playlistName, setPlaylistName] = React.useState<string>("");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        if (!userName) return;

        makeApiRequest({
            method: "get",
            url: `/api/v1/playlists`,
            params: { userName, videoId },
        }).then((playlistsRes) => {
            const playlistData = (playlistsRes as ResponseType).data?.playlists;
            setPlaylists(playlistData.map((playlist: PlaylistType) =>
                ({ name: playlist.name, id: playlist._id, videoStatus: playlist.videoStatus })));
        }).catch((error: ErrorType) => {
            if (error.response.data.statusCode === 401) {
                toast.error("Please login to view playlists");
            }
            console.error(error.response.data.message);
        });
    }, [userName, videoId]);

    const handleCheckboxChange = (playlistId: string, videoStatus: boolean) => {
        setPlaylists((prevPlaylists) =>
            prevPlaylists.map((playlist) =>
                playlist.id === playlistId ? { ...playlist, videoStatus: videoStatus } : playlist
            )
        );
        if (videoStatus) {
            handleSaveToPlaylist(playlistId, videoId);
        } else {
            handleDeleteFromPlaylist(playlistId, videoId);
        }
    };

    const handleSaveToPlaylist = (playlistId: string, videoId: string) => {
        makeApiRequest({
            method: "post",
            url: `/api/v1/playlists/${playlistId}/${videoId}`,
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
        });
    }

    const handleDeleteFromPlaylist = (playlistId: string, videoId: string) => {
        makeApiRequest({
            method: "delete",
            url: `/api/v1/playlists/${playlistId}/${videoId}`,
        }).catch((error: ErrorType) => {
            console.error(error.response.data.message);
        });
    }

    const handleCreatePlaylist = (playlistName: string, videoId: string) => {
        makeApiRequest({
            method: "post",
            url: `/api/v1/playlists`,
            data: { name: playlistName, videoId },
        }).then((playlistsRes) => {
            const playlistData = (playlistsRes as ResponseType).data?.playlist;

            setPlaylists((prevPlaylists) => [...prevPlaylists, { name: playlistName, id: playlistData?._id, videoStatus: true }]);
            toast.success(`Saved to ${playlistName} successfully`);
            setShowSaveToPlaylist(false);
            setPlaylistName("");
        }).catch((error: ErrorType) => {
            if (error.response.data.statusCode === 401) {
                toast.error("Please login to create a playlist");
            }
            console.error(error.response.data.message);
        });
    }

    return (
        <div className="absolute z-10 p-4 rounded-lg bg-background-primary text-primary-text cursor-auto top-10 right-0 border-primary-border border-2">
            <h3 className="text-sm font-semibold text-nowrap text-center">
                Save to playlist
            </h3>

            {/* your playlists */}
            <div className="text-xs flex flex-col gap-2 pt-4">
                {playlists?.map((playlist) => (
                    <div key={playlist.id} className="flex items-center capitalize">
                        <input
                            type="checkbox"
                            id={playlist.id}
                            className="mr-2 cursor-pointer outline-none"
                            checked={playlist.videoStatus}
                            onChange={() => handleCheckboxChange(playlist.id, !playlist.videoStatus)}
                        />
                        <label htmlFor={playlist.id} className='truncate-lines-2'>
                            {playlist.name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Add playlist */}
            <div className="w-full text-xs mt-3">
                <h3 className="text-start mb-1">
                    Name
                </h3>
                <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="rounded-md p-1 mb-1 outline-none text-black font-semibold"
                    placeholder="Enter playlist name"
                />
                <button className="bg-primary text-primary-text outline-none font-semibold px-3 py-1 xs:text-sm rounded-md mt-2 w-full"
                    onClick={() => { handleCreatePlaylist(playlistName, videoId) }}>
                    Create a Playlist
                </button>
            </div>
        </div>
    )
}

export default SaveToPlaylist;
import React from 'react';

const SaveToPlaylist: React.FC = () => {
    const playlists = [
        { id: "1", name: "playlist 1" },
        { id: "2", name: "playlist 2" },
        { id: "3", name: "playlist 3" },
        { id: "4", name: "playlist 4" },
        { id: "5", name: "playlist 5" },
    ];

    return (
        // <div className="absolute -z-10 group-focus-within:z-10 p-4 rounded-lg bg-background-primary text-white top-full right-0 shadow-[0_1px_2px_white]">
        <div className="absolute -z-10 group-focus-within:z-10 p-4 rounded-lg bg-background-primary text-primary-text cursor-auto top-10 right-0 border-primary-border border-2">
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
                        />
                        <label htmlFor={playlist.id}>
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
                    className="rounded-md p-1 mb-1 outline-none text-black"
                    placeholder="Enter playlist name"
                />
                <button className="bg-primary text-primary-text outline-none font-semibold px-3 py-1 xs:text-sm rounded-md mt-2 w-full">
                    Create a Playlist
                </button>
            </div>
        </div >
    )
}

export default SaveToPlaylist;
import React from 'react'

const SaveToPlaylist: React.FC = () => {
    return (
        <div className="absolute -z-10 group-focus-within:z-10 p-4 rounded-lg bg-background text-white top-full right-0 shadow-[0_1px_2px_white]">
            <h3 className="text-sm font-semibold text-nowrap">
                Save to playlist
            </h3>

            {/* your playlists */}
            <div className="text-xs flex flex-col gap-2 pt-4">
                <div className="flex items-center capitalize">
                    <input
                        type="checkbox"
                        id="playlist1"
                        className="mr-2"
                    />
                    <label htmlFor="playlist1">
                        playlist1
                    </label>
                </div>
                <div className="flex items-center capitalize">
                    <input
                        type="checkbox"
                        id="playlist2"
                        className="mr-2"
                    />
                    <label htmlFor="playlist2">
                        playlist2
                    </label>
                </div>
                <div className="flex items-center capitalize">
                    <input
                        type="checkbox"
                        id="playlist3"
                        className="mr-2"
                    />
                    <label htmlFor="playlist3">
                        playlist3
                    </label>
                </div>
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
                <button className="bg-primary text-white font-semibold px-4 py-1 xs:px-3 xs:text-sm rounded-md mt-2">
                    Create a Playlist
                </button>
            </div>
        </div>
    )
}

export default SaveToPlaylist;
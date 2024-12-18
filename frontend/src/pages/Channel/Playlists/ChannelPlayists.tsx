import React from "react";
import PlaylistCard from "../../Playlists/PlaylistCard";
import { PiFolder } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import makeApiRequest from "../../../utils/MakeApiRequest";

interface ChannelPlaylistsProps {
    channelInfo?: React.ReactNode;
}
const ChannelPlaylists: React.FC<ChannelPlaylistsProps> = ({ channelInfo }) => {
    const [playlists, setPlaylists] = React.useState([]);
    const navigate = useNavigate();
    const { adminName } = useParams<{ adminName: string }>();
    console.log("adminName:", channelInfo);

    React.useEffect(() => {
        const userName = adminName?.substring(1);
        if (!userName) navigate("/");

        makeApiRequest({
            method: "get",
            url: `/api/v1/playlists?userName=${userName}`,
        }).then((response: any) => {
            console.log("response:", response.data);
            setPlaylists(response.data?.playlists);
        }).catch((error) => {
            console.error("Error fetching data:", error);
            navigate("/");
        });
    }, [navigate, adminName]);


    if (playlists?.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center text-center text-white px-4 w-full max-w-6xl mx-auto mt-4 z-0 mb-4">
                <PiFolder className="text-4xl text-primary bg-blue-100 rounded-full p-1.5" />
                <h1 className="text-md font-semibold">No Playlists Created</h1>
                <p className="text-sm">There are no playlist created on this channel.</p>
            </div>
        );
    }

    return (
        < div className={twMerge("grid px-4 w-full max-w-6xl mx-auto justify-items-center z-0 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1", adminName ? "mt-4" : "mt-2")} >
            {
                playlists?.map((playlist: any) => (
                    <PlaylistCard key={playlist._id} playlist={playlist} />
                ))
            }
        </div >
    );
};

export default ChannelPlaylists;

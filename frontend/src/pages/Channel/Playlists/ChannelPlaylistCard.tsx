import React from "react";
import thumbnail from "../../../assets/thumbnail.png";
import { Link } from "react-router-dom";
import { CgPlayList } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";

const ChannelVideosCard: React.FC = () => {
	const videos = 100;
	const updatedAt = "3 days";

	return (
		<div className="flex flex-col gap-2 p-2 max-w-[400px]">
			<Link to="/register">
				<div className="overflow-hidden rounded-xl relative">
					{/* // 1st video img. */}
					<img
						src={thumbnail}
						alt="thumbnail"
						className="rounded-xl aspect-video duration-300"
					/>
					<p className="px-1 py-[1px] absolute bottom-2 right-2 text-xs text-white rounded-md bg-black bg-opacity-70 flex items-center">
						<CgPlayList className="text-lg mt-[2px]" />
						<span>{videos} videos</span>
					</p>
					<div className="absolute text-white z-10 top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-70 duration-300 flex gap-1 justify-center items-center">
						<FaPlay />
						<span>PLAY ALL</span>
					</div>
				</div>
			</Link>
			<div className="flex gap-3">
				<div className="flex flex-col text-white w-full">
					<Link to="/register">
						<h2 className="font-bold">Video Title</h2>
						<p className="text-sm opacity-80">
							Updated {updatedAt} ago
						</p>
						<p className="text-sm opacity-80">View full playlist</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ChannelVideosCard;

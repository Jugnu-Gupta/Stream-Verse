import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import VideoListView from "./VideoListView";
import { FaPlus } from "react-icons/fa6";
// import DeleteVideo from "../../components/Popup/DeleteVideo";
// import EditVideo from "../../components/Popup/EditVideo";


const Dashboard: React.FC = () => {
	const Views = 100;
	const Subscribers = 100;
	const Likes = 100;
	const Comments = 100;

	return (
		<div className="w-full mt-4 px-6 relative">
			{/* <DeleteVideo /> */}
			{/* <EditVideo /> */}
			<section className="text-white">
				<div className="flex justify-between items-center">
					<div className="my-2">
						<h1 className="text-xl font-bold">
							Welcome to the dashboard
						</h1>
						<p className="text-sm">
							Here you can manage your videos
						</p>
					</div>
					<button className="flex items-center gap-1 bg-primary rounded-lg px-2 py-[2px]">
						<FaPlus />
						<span>Upload Video</span>
					</button>
				</div>

				{/* Status */}
				{/* <div className="w-full grid grid-cols-4 gap-4 justify-items-center"> */}
				<div className="w-full flex gap-4 justify-between">
					<div className="flex flex-col px-3 py-2 bg-background-lighter rounded-xl border-2 w-1/4">
						<FaRegEye className="text-2xl bg-white text-primary rounded-full p-1" />
						<h3 className="text-xs mt-2 opacity-90">Total Views</h3>
						<p className="text-xl font-semibold">{Views}</p>
					</div>

					<div className="flex flex-col px-3 py-2 bg-background-lighter rounded-xl border-2 w-1/4">
						<FaRegUser className="text-2xl bg-white text-primary rounded-full p-1" />
						<h3 className="text-xs mt-2 opacity-90">
							Total Subscribers
						</h3>
						<p className="text-xl font-semibold">{Subscribers}</p>
					</div>

					<div className="flex flex-col px-3 py-2 bg-background-lighter rounded-xl border-2 w-1/4">
						<FaRegHeart className="text-2xl bg-white text-primary rounded-full p-1" />
						<h3 className="text-xs mt-2 opacity-90">Total Likes</h3>
						<p className="text-xl font-semibold">{Likes}</p>
					</div>

					<div className="flex flex-col px-3 py-2 bg-background-lighter rounded-xl border-2 w-1/4">
						<BiCommentDetail className="text-2xl bg-white text-primary rounded-full p-1" />
						<h3 className="text-xs mt-2 opacity-90">
							Total Comments
						</h3>
						<p className="text-xl font-semibold">{Comments}</p>
					</div>
				</div>
			</section>
			<section className="mt-8 border-2 border-white">
				<ul className="flex gap-2 justify-between text-white p-2 border-b-2 border-white font-semibold">
					<li className="w-11 text-start">Status</li>
					<li className="w-24 text-center">Publish</li>
					<li className="w-1/3 text-center">Title</li>
					<li className="w-[150px] text-center">Ratings</li>
					<li className="w-24 text-center text-nowrap pr-2">
						Upload Date
					</li>
					<li className="w-12 px-2">Edit</li>
				</ul>

				<div className="flex flex-col">
					<VideoListView />
					<VideoListView />
					<VideoListView />
					<VideoListView />
					<VideoListView />
				</div>
			</section>
		</div>
	);
};

export default Dashboard;

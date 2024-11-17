import React from "react";
import DashboardStats from "./DashboardStats";
import DashboardVideos from "./DashboardVideos";


const Dashboard: React.FC = () => {

	return (
		<div className="w-full mt-4 max-w-6xl mx-auto relative overflow-auto">
			{/* {showEditVideo && <EditVideoModal setShowEditVideo={setShowEditVideo} />} */}
			{/* {showDeleteVideo && <DeleteVideoModal setShowDeleteVideo={setShowDeleteVideo} />} */}
			{/* {showUploadVideo && <UploadVideoModal setShowUploadVideo={setShowUploadVideo} />} */}

			<section className="text-white px-6">
				<DashboardStats />
				<DashboardVideos />
			</section>
			{/* <section className="mt-8 border-2 border-white overflow-x-auto">
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
			</section> */}
		</div>
	);
};

export default Dashboard;

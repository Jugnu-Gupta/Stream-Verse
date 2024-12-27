import React from "react";
import DashboardStats from "./DashboardStats";
import DashboardVideos from "./DashboardVideos";

const Dashboard: React.FC = () => {
	return (
		<div className="w-full mt-4 max-w-6xl mx-auto relative overflow-auto">
			{/* {showDeleteVideo && <DeleteModal setShowDeleteVideo={setShowDeleteVideo} />} */}
			{/* {showUploadVideo && <UploadVideoModal setShowUploadVideo={setShowUploadVideo} />} */}

			<section className="text-white px-6">
				<DashboardStats />
				<DashboardVideos />
			</section>
		</div>
	);
};

export default Dashboard;

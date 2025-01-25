import React from "react";
import DashboardStats from "./DashboardStats";
import DashboardVideos from "./DashboardVideos";

const Dashboard: React.FC = () => {
	const [showUploadingVideo, setShowUploadingVideo] = React.useState<boolean>(false);

	return (
		<div className="w-full mt-4 max-w-6xl mx-auto relative overflow-auto">
			{/* {showDeleteVideo && <DeleteModal setShowDeleteVideo={setShowDeleteVideo} />} */}
			{/* {showUploadVideo && <UploadVideoModal setShowUploadVideo={setShowUploadVideo} />} */}

			<section className="text-white px-6">
				<DashboardStats showUploadingVideo={showUploadingVideo} setShowUploadingVideo={setShowUploadingVideo} />
				<DashboardVideos showUploadingVideo={showUploadingVideo} />
			</section>
		</div>
	);
};

export default Dashboard;

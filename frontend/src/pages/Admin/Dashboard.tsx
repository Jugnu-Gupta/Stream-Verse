import React from "react";
import DashboardStats from "./DashboardStats";
import DashboardVideos from "./DashboardVideos";

const Dashboard: React.FC = () => {
	const [rerender, setRerender] = React.useState<number>(0);

	return (
		<div className="w-full mt-4 max-w-6xl mx-auto relative overflow-auto">
			<section className="text-white px-6">
				<DashboardStats setRerender={setRerender} />
				<DashboardVideos rerender={rerender} />
			</section>
		</div>
	);
};

export default Dashboard;

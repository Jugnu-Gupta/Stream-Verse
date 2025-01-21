interface DashboardVideoType {
	_id: string;
	title: string;
	description: string;
	thumbnail: {
		url: string;
		publicId: string;
	};
	views: number;
	likes: number;
	dislikes: number;
	isPublished: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface DashboardStatsType {
	_id: string;
	totalViews: number;
	totalLikes: number;
	totalDislikes: number;
	totalVideos: number;
	totalComments: number;
	totalSubscribers: number;
}

export type { DashboardVideoType, DashboardStatsType };

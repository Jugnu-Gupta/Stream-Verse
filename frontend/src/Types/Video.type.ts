interface VideoType {
	_id: string;
	title: string;
	description: string;
	views: number;
	duration: number;
	isPublished?: boolean;
	thumbnail: {
		url: string;
		publicId: string;
	};
	owner?: {
		_id: string;
		userName: string;
		fullName: string;
		avatar?: {
			url: string;
			publicId: string;
		};
	};
	updatedAt: Date;
	createdAt: Date;
}

interface VideoDetailsType extends VideoType {
	likeStatus: number;
	quality: string;
	subscribers: number;
	likes: number;
	dislikes: number;
	noOfComments: number;
	VideoFile: {
		url: string;
		publicId: string;
	};
}

export type { VideoType, VideoDetailsType };

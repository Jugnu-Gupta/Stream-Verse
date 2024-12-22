export interface TweetType {
	_id: string;
	content: string;
	likeStatus: number;
	likes: number;
	dislikes: number;
	comments: number;
	image?: {
		url: string;
		publicId: string;
	};
	owner: {
		_id: string;
		fullName: string;
		userName: string;
		avatar: {
			url: string;
			publicId: string;
		};
	};
	createdAt: Date;
	updatedAt: Date;
}

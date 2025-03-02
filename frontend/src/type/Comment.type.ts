interface CommentType {
	owner: {
		_id: string;
		userName: string;
		fullName: string;
		avatar?: {
			url: string;
			publicId: string;
		};
	};
	content: string;
	_id: string;
	replies: number;
	likeStatus: number;
	likes: number;
	dislikes: number;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export type { CommentType };

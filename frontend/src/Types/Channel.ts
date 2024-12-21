export interface ChannelInfoType {
	_id: string;
	fullName: string;
	userName: string;
	email: string;
	avatar: {
		url: string;
		publicId: string;
	};
	coverImage: {
		url: string;
		publicId: string;
	};
	isSubscribed: boolean;
	subscriberCount: number;
	subscribedToCount?: number;
	videoCount: number;
	createdAt: Date;
	updatedAt: Date;
}

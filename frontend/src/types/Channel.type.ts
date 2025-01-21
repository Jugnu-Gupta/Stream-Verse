interface ChannelInfoType {
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
	videoCount: number;
	createdAt: Date;
	updatedAt: Date;
}

interface ChannelType {
	_id: string;
	fullName: string;
	userName: string;
	subsribers: number;
	avatar: {
		url: string;
		publicId: string;
	} | null;
	createdAt: Date;
	updatedAt: Date;
}

interface SubscribedChannelType {
	_id: string;
	fullName: string;
	userName: string;
	isSubscribed: boolean;
	totalSubscribers: number;
	avatar: {
		url: string;
		publicId: string;
	};
}

export type { ChannelType, ChannelInfoType, SubscribedChannelType };

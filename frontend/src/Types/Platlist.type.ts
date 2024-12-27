import { VideoType } from "./Video.type";

interface PlaylistType {
	_id: string;
	name: string;
	description: string;
	noOfVideos: number;
	videoId: string;
	videoStatus?: boolean;
	thumbnail: {
		url: string;
		publicId: string;
	};
	updatedAt: Date;
	createdAt: Date;
}

interface PlaylistVideosType extends PlaylistType {
	videos: VideoType[];
	owner: {
		_id: string;
		userName: string;
		fullName: string;
		avatar: {
			url: string;
			publicId: string;
		};
	};
}

export type { PlaylistType, PlaylistVideosType };

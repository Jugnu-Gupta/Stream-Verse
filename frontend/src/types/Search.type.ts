import { ChannelType } from "./Channel.type";
import { PlaylistType } from "./Platlist.type";
import { VideoType } from "./Video.type";

interface SearchType {
	uploadDate: string;
	type: string;
	duration: string;
	sortBy: string;
	curSearch?: string;
	videos: VideoType[];
	playlists: PlaylistType[];
	channels: ChannelType[];
}

export type { SearchType };

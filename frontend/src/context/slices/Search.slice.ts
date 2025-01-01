import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoType } from "../../Types/Video.type";
import { PlaylistType } from "../../Types/Platlist.type";
import { ChannelType } from "../../Types/Channel.type";

export interface SearchType {
	uploadDate: string;
	type: string;
	duration: string;
	sortBy: string;
	curSearch?: string;
	videos: VideoType[];
	playlists: PlaylistType[];
	channels: ChannelType[];
}
const initialState: SearchType = {
	uploadDate: "anytime",
	type: "video",
	duration: "any",
	sortBy: "relevance",
	videos: [],
	playlists: [],
	channels: [],
	curSearch: "video",
};

const searchSlice = createSlice({
	name: "search",
	initialState: initialState,
	reducers: {
		updateFilters: (
			state: SearchType,
			action: PayloadAction<SearchType>
		) => {
			state.type = action.payload.type;
			state.uploadDate = action.payload.uploadDate;
			state.duration = action.payload.duration;
			state.sortBy = action.payload.sortBy;
			state.videos = action.payload.videos;
			state.playlists = action.payload.playlists;
			state.channels = action.payload.channels;
			state.curSearch = action.payload.curSearch;
		},
	},
});

export const { updateFilters } = searchSlice.actions;
export default searchSlice.reducer;

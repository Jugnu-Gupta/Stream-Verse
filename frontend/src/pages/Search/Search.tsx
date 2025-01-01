import React from "react";
import VideoListView from "./VideoListView";
import VideoCardView from "../Home/VideoCardView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { SearchType } from "../../context/slices/Search.slice";
import { updateFilters } from "../../context/slices/Search.slice";
import { VideoType } from "../../Types/Video.type";
import PlaylistListView from "./PlaylistListView";
import { PlaylistType } from "../../Types/Platlist.type";
import PlaylistCardView from "./PlaylistCardView";
import ChannelCardView from "./ChannelCardView";
import { ChannelType } from "../../Types/Channel.type";
import NoResultsFound from "./NoResultsFound";

// const videoInfo = {
// 	_id: "1",
// 	title: "Title",
// 	description: "Description",
// 	views: 100,
// 	duration: 100,
// 	owner: {
// 		_id: "1",
// 		userName: "Username",
// 		fullName: "Full Name",
// 	},
// 	thumbnail: {
// 		url: "https://via.placeholder.com/150",
// 		publicId: "1",
// 	},
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// };


const Search: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const searchValues: SearchType = useSelector((state: RootState) => state.search);
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name === "type") {
			dispatch(updateFilters({ ...searchValues, uploadDate: "anytime", type: value, duration: "any", sortBy: "relevance" }));
		} else if (searchValues.type === "channel" || searchValues.type === "playlist") {
			dispatch(updateFilters({ ...searchValues, uploadDate: "anytime", type: searchValues.type, duration: "any", sortBy: "relevance" }));
		} else {
			dispatch(updateFilters({ ...searchValues, [name]: value }));
		}
	};

	return (
		<div className="sm:flex w-11/12 mx-auto max-w-7xl mt-2 md:px-2 px-1">
			<div className="w-full h-full">
				<form className="w-full flex justify-start md:gap-4 sm:gap-2 gap-4 xs:gap-y-2 xs:flex-wrap text-primary-text text-nowrap px-2 my-2">
					<div className="font-semibold">
						<select value={searchValues.uploadDate} name="uploadDate" onChange={handleChange}
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 outline-none">
							<option value="anytime">Anytime</option>
							<option value="today">Today</option>
							<option value="thisWeak">This weak</option>
							<option value="thisMonth">This month</option>
							<option value="thisYear">This year</option>
						</select>
					</div>
					<div className="font-semibold">
						<select value={searchValues.type} name="type" onChange={handleChange}
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 pr-0 outline-none">
							<option value="video">Video</option>
							<option value="playlist">Playlist</option>
							<option value="channel">Channel</option>
						</select>
					</div>
					<div className="font-semibold">
						<select value={searchValues.duration} name="duration" onChange={handleChange}
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 pr-0 outline-none">
							<option value="any">No fixed duration</option>
							<option value="short">Under 4 minutes</option>
							<option value="medium">5-15 minutes</option>
							<option value="long">Over 15 minutes</option>
						</select>
					</div>
					<div className="flex items-center truncate gap-1 font-semibold justify-center">
						<select value={searchValues.sortBy} name="sortBy" onChange={handleChange}
							className="text-xs w-24 md:w-fit bg-background-tertiary border-2 border-primary-border rounded-md p-1 pr-0 outline-none">
							<option value="relevance">Relevance</option>
							<option value="uploadDate">uploadDate</option>
							<option value="views">Views</option>
						</select>
					</div>
				</form>
				{
					searchValues.curSearch === "video" &&
					(searchValues.videos.length === 0 ?
						<NoResultsFound style="mt-40" entityName="video" heading="No videos found"
							message="Try different keywords or remove search filters" />
						: <>
							<div className="sm:flex hidden flex-col">
								{searchValues.videos?.map((video: VideoType) => (
									<VideoListView key={video._id} videoInfo={video} />
								))}
							</div>
							<div className="sm:hidden flex flex-col">
								{searchValues.videos?.map((video: VideoType) => (
									<VideoCardView key={video._id} videoInfo={video} />
								))}
							</div>
						</>)
				}
				{
					searchValues.curSearch === "playlist" &&
					(searchValues.playlists.length === 0 ?
						<NoResultsFound style="mt-40" entityName="playlist" heading="No playlists found"
							message="Try different keywords or remove search filters" />
						: <>
							<div className="sm:flex hidden flex-col">
								{searchValues.playlists?.map((video: PlaylistType) => (
									<PlaylistListView key={video._id} playlistInfo={video} />
								))}
							</div>
							<div className="sm:hidden flex flex-col">
								{searchValues.playlists?.map((video: PlaylistType) => (
									<PlaylistCardView key={video._id} playlistInfo={video} />
								))}
							</div>
						</>)
				}
				{
					searchValues.curSearch === "channel" &&
					(searchValues.channels.length === 0 ? <NoResultsFound style="mt-40" entityName="channel"
						heading="No playlists found" message="Try different keywords or remove search filters" />
						: <>
							<div className="flex wrap">
								{searchValues.channels?.map((channel: ChannelType) => (
									<ChannelCardView key={channel._id} channelInfo={channel} />
								))}
							</div>
						</>)
				}
			</div>
		</div>
	);
};

export default Search;

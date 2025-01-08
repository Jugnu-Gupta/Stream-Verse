import React, { useEffect } from "react";
import VideoListView from "./VideoListView";
import VideoCardView from "../Home/VideoCardView";
import { VideoType } from "../../Types/Video.type";
import PlaylistListView from "./PlaylistListView";
import { PlaylistType } from "../../Types/Platlist.type";
import PlaylistCardView from "./PlaylistCardView";
import ChannelCardView from "./ChannelCardView";
import { ChannelType } from "../../Types/Channel.type";
import NoResultsFound from "./NoResultsFound";
import { useLocation } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { SearchType } from "../../Types/Search.type";
import { usePagination } from "../../hooks/usePagination";


const Search: React.FC = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const searchText = query.get("searchText");
	const [searchValues, setSearchValues] = React.useState<SearchType>({
		uploadDate: "anytime",
		type: "video",
		duration: "any",
		sortBy: "relevance",
		curSearch: "video",
		videos: [],
		playlists: [],
		channels: [],
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name === "type") {
			setSearchValues({ ...searchValues, uploadDate: "anytime", type: value, duration: "any", sortBy: "relevance" });
		} else if (searchValues.type === "channel" || searchValues.type === "playlist") {
			setSearchValues({ ...searchValues, uploadDate: "anytime", type: searchValues.type, duration: "any", sortBy: "relevance" });
		} else {
			setSearchValues({ ...searchValues, [name]: value });
		}
	};

	const handleSearch = (page: number, loading: boolean, hasMore: boolean, searchText: string) => {
		console.log("before searching...", searchText, loading, hasMore);
		if (searchText?.trim() === "" || loading || !hasMore) return;
		console.log("after searching...", searchText, loading, hasMore);

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/videos`,
			params: {
				page: page,
				limit: 2,
				query: encodeURIComponent(searchText?.trim() || ""),
				type: searchValues.type,
				duration: searchValues.duration,
				sortBy: searchValues.sortBy,
				uploadDate: searchValues.uploadDate,
			}
		}).then((response: any) => { // eslint-disable-line
			const data = response.data.data;
			console.log("video:", response.data);
			if (searchValues.type === "video") {
				setSearchValues({ ...searchValues, videos: (page !== 1 ? searchValues.videos : []).concat(data), playlists: [], channels: [], curSearch: "video" });
			} else if (searchValues.type === "playlist") {
				setSearchValues({ ...searchValues, playlists: (page !== 1 ? searchValues.playlists : []).concat(data), videos: [], channels: [], curSearch: "playlist" });
			} else if (searchValues.type === "channel") {
				setSearchValues({ ...searchValues, channels: (page !== 1 ? searchValues.channels : []).concat(data), videos: [], playlists: [], curSearch: "channel" });
			}
			setPage((prev) => prev + 1);
			setHasMore(data.length > 0);
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
		});
		setLoading(false);
	}

	const { page, setPage, loading, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(handleSearch);

	useEffect(() => {
		setHasMore(true);
		setPage(1);
		handleSearch(page, loading, hasMore, searchText || "");
	}, [searchText]); // Dependency on searchText

	return (
		<div className="sm:flex w-11/12 mx-auto max-w-7xl mt-2 md:px-2 px-1">
			<div className="w-full h-full">
				<form className="w-full flex justify-start md:gap-4 sm:gap-2 gap-4 xs:gap-y-2 xs:flex-wrap text-primary-text px-2 my-2">
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
							<option value="uploadDate">upload date</option>
							<option value="views">Views</option>
						</select>
					</div>
				</form>
				{
					searchValues.curSearch === "video" &&
					(searchValues.videos.length === 0 ?
						<NoResultsFound style="mt-40" entityName="video" heading="No videos found"
							message="Please try to search something else or remove filters." />
						: <div className="w-full">
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
						</div>)
				}
				{
					searchValues.curSearch === "playlist" &&
					(searchValues.playlists.length === 0 ?
						<NoResultsFound style="mt-40" entityName="playlist" heading="No playlists found"
							message="Please try to search something else or remove filters." />
						: <div className="w-full">
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
						</div>)
				}
				{
					searchValues.curSearch === "channel" &&
					(searchValues.channels.length === 0 ? <NoResultsFound style="mt-40" entityName="channel"
						heading="No channels found" message="Please try to search something else or remove filters." />
						: <div className="w-full">
							<div className="flex wrap">
								{searchValues.channels?.map((channel: ChannelType) => (
									<ChannelCardView key={channel._id} channelInfo={channel} />
								))}
							</div>
						</div>)
				}
				<div ref={lastItemRef} className="w-full h-4 flex justify-center items-center">
				</div>
			</div>
		</div>
	);
};

export default Search;

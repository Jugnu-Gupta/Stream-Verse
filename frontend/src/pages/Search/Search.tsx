import React, { useCallback, useEffect } from "react";
import VideoListView from "./VideoListView";
import VideoCardView from "../Home/VideoCardView";
import { VideoType } from "../../Types/Video.type";
import PlaylistListView from "./PlaylistListView";
import { PlaylistType } from "../../Types/Platlist.type";
import PlaylistCardView from "./PlaylistCardView";
import ChannelCardView from "./ChannelCardView";
import { ChannelType } from "../../Types/Channel.type";
import NoResultsFound from "./NoResultsFound";
import { useSearchParams } from "react-router-dom";
import makeApiRequest from "../../utils/MakeApiRequest";
import { SearchType } from "../../Types/Search.type";
import { usePagination } from "../../hooks/usePagination";
import loadingGIF from "../../assets/loading.gif";
import { ErrorType } from "../../Types/Error.type";
import { ResponseType } from "../../Types/Response.type";


const Search: React.FC = () => {
	const [searchParams] = useSearchParams();
	const searchText: string | null = searchParams.get("searchText");
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

	const handleSearch = useCallback((page: number, loading: boolean, hasMore: boolean, searchText: string) => {
		if (searchText?.trim() === "" || loading || !hasMore) return;

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/videos`,
			params: {
				page: page,
				limit: 10,
				query: encodeURIComponent(searchText?.trim() || ""),
				type: searchValues.type,
				duration: searchValues.duration,
				sortBy: searchValues.sortBy,
				uploadDate: searchValues.uploadDate,
			}
		}).then((response) => {
			const videosData = (response as ResponseType).data.data;
			if (searchValues.type === "video") {
				setSearchValues({ ...searchValues, videos: (page !== 1 ? searchValues.videos : []).concat(videosData), playlists: [], channels: [], curSearch: "video" });
			} else if (searchValues.type === "playlist") {
				setSearchValues({ ...searchValues, playlists: (page !== 1 ? searchValues.playlists : []).concat(videosData), videos: [], channels: [], curSearch: "playlist" });
			} else if (searchValues.type === "channel") {
				setSearchValues({ ...searchValues, channels: (page !== 1 ? searchValues.channels : []).concat(videosData), videos: [], playlists: [], curSearch: "channel" });
			}
			setPage((prev) => prev + 1);
			setHasMore(videosData.length > 0);
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	}, [searchValues]);

	const { setPage, loading, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(handleSearch, searchText || "");

	useEffect(() => {
		setHasMore(true);
		setPage(1);
		handleSearch(1, loading, true, searchText || "");
	}, [searchParams, setHasMore, setPage]);

	return (
		<div className="sm:flex w-11/12 mx-auto max-w-7xl mt-2 md:px-2 px-1">
			<div className="w-full h-full">
				<form className="w-full flex justify-start md:gap-4 sm:gap-2 gap-4 xs:gap-y-2 xs:flex-wrap text-primary-text px-2 my-2">
					<div className="font-semibold">
						<select value={searchValues.uploadDate} name="uploadDate" onChange={handleChange} title="Upload date"
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 outline-none">
							<option value="anytime">Anytime</option>
							<option value="today">Today</option>
							<option value="thisWeak">This weak</option>
							<option value="thisMonth">This month</option>
							<option value="thisYear">This year</option>
						</select>
					</div>
					<div className="font-semibold">
						<select value={searchValues.type} name="type" onChange={handleChange} title="Type"
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 pr-0 outline-none">
							<option value="video">Video</option>
							<option value="playlist">Playlist</option>
							<option value="channel">Channel</option>
						</select>
					</div>
					<div className="font-semibold">
						<select value={searchValues.duration} name="duration" onChange={handleChange} title="Duration"
							className="text-xs w-24 md:w-fit truncate bg-background-tertiary border-2 border-primary-border rounded-md p-1 pr-0 outline-none">
							<option value="any">Any</option>
							<option value="short">Under 4 minutes</option>
							<option value="medium">5-15 minutes</option>
							<option value="long">Over 15 minutes</option>
						</select>
					</div>
					<div className="flex items-center truncate gap-1 font-semibold justify-center">
						<select value={searchValues.sortBy} name="sortBy" onChange={handleChange} title="Sort by"
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
						(!hasMore ? <NoResultsFound style="mt-40" entityName="video" heading="No videos found"
							message="Please try to search something else or remove filters." />
							: (<div className='w-full h-full flex justify-center items-center'>
								<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
							</div>)
						) : <div className="w-full">
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
						(!hasMore ? <NoResultsFound style="mt-40" entityName="playlist" heading="No playlists found"
							message="Please try to search something else or remove filters." />
							: (<div className='w-full h-full flex justify-center items-center'>
								<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
							</div>)
						) : <div className="w-full">
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
					(searchValues.channels.length === 0 ?
						(!hasMore ? <NoResultsFound style="mt-40" entityName="channel"
							heading="No channels found" message="Please try to search something else or remove filters." />
							: (<div className='w-full h-full flex justify-center items-center'>
								<img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
							</div>)
						) : <div className="w-full">
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

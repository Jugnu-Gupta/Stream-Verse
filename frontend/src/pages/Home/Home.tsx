import React, { useEffect } from "react";
import VideoCardView from "./VideoCardView";
import makeApiRequest from "../../utils/MakeApiRequest";
import { VideoType } from "../../Types/Video.type";
import { usePagination } from "../../hooks/usePagination";
import NoResultsFound from "../Search/NoResultsFound";
import loadingGIF from "../../assets/loading.gif";
import { ErrorType } from "../../Types/Error.type";
import { ResponseType } from "../../Types/Response.type";

const Home: React.FC = () => {
	const [videos, setVideos] = React.useState<VideoType[]>([]);

	const handleSearch = (page: number, loading: boolean, hasMore: boolean) => {
		if (loading || !hasMore) return;

		setLoading(true);
		makeApiRequest({
			method: "get",
			url: `/api/v1/videos`,
			params: {
				page: page,
				limit: 10,
				query: "",
				sortBy: "views",
			},
		}).then((response) => {
			const data = (response as ResponseType).data.data;

			setPage((prevPage) => prevPage + 1);
			setHasMore(data.length > 0);
			setVideos((prevVideos) => [...prevVideos, ...data]);
		}).catch((error: ErrorType) => {
			setHasMore(false);
			console.error(error.response.data.message);
		}).finally(() => {
			setLoading(false);
		});
	};
	const { setPage, loading, setLoading, hasMore, setHasMore, lastItemRef } =
		usePagination(handleSearch);

	useEffect(() => {
		setPage(1);
		setHasMore(true);
		handleSearch(1, loading, true);
	}, []);

	return (
		<>
			{
				videos.length === 0 ? (!hasMore ?
					<NoResultsFound
						style="mt-40"
						entityName="video"
						heading="No videos found"
						message="We couldn't find any similar videos at the moment. Please try again later."
					/>
					: <div className="w-full h-full flex justify-center items-center">
						<img src={loadingGIF} alt="loading" loading="lazy" className="w-24" />
					</div>
				) :
					<div className="h-fit grid m-2 max-w-7xl w-full items-start 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1">
						{videos?.map((video: VideoType) => (
							<VideoCardView key={video._id} videoInfo={video} />
						))}
						<div key={"lastItemRef"} ref={lastItemRef} className="w-full h-1"></div>
					</div>
			}
		</>
	)
};

export default Home;

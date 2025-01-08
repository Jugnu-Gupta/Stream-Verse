import React from "react";
import VideoCardView from "./VideoCardView";
import makeApiRequest from "../../utils/MakeApiRequest";
import { VideoType } from "../../Types/Video.type";
import { usePagination } from "../../hooks/usePagination";

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
		}).then((response: any) => { // eslint-disable-line
			const data = response.data.data;
			setPage((prevPage) => prevPage + 1);
			setHasMore(data.length > 0);
			setVideos((prevVideos) => [...prevVideos, ...data]);
		}).catch((error: any) => { // eslint-disable-line
			console.error(error.response.data.message);
		});
		setLoading(false);
	};
	const { setPage, setLoading, setHasMore, lastItemRef } =
		usePagination(handleSearch);

	return (
		<div className="h-fit grid m-2 max-w-7xl w-full items-start 2xl:grid-cols-4 2lg:grid-cols-3 2sm:grid-cols-2 grid-cols-1">
			{videos?.map((video: VideoType, index: number) => (
				<VideoCardView key={video._id + index} videoInfo={video} />
			))}

			<div key={"lastItemRef"} ref={lastItemRef} className="w-full h-1">
			</div>
		</div>
	);
};

export default Home;

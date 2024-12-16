import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import makeApiRequest, { ApiRequestOptions } from "../utils/MakeApiRequest";

interface useGetVideosProps {
	method: "get" | "post" | "put" | "delete";
	url: string;
}
export const useGetVideos = ({ method, url }: useGetVideosProps) => {
	const [videos, setVideos] = React.useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getVideos = async () => {
			try {
				const request: ApiRequestOptions = {
					method,
					url,
				};
				const { data }: any = await makeApiRequest(request);
				console.log("video:", data.videos);
				setVideos(data.videos);
			} catch (error) {
				console.log(error);
				// navigate("/");
			}
		};
		getVideos();
	}, [navigate, method, url]);

	return { videos };
};

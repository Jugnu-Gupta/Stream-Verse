import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import makeApiRequest, { ApiRequestOptions } from "../utils/MakeApiRequest";

export const useAuth = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(true);
	const [loggedIn, setLoggedIn] = React.useState(false);

	useEffect(() => {
		const getUser = async () => {
			try {
				const request: ApiRequestOptions = {
					method: "get",
					url: "/api/v1/users/me",
				};
				const { data }: any = await makeApiRequest(request);
				console.log(data);
				setLoading(false);
				setLoggedIn(true);
			} catch (error: any) {
				console.error("header", error.response.data.message);
				setLoading(false);
				setLoggedIn(false);
				// navigate("/login");
			}
		};
		getUser();
	}, [navigate]);

	return { loggedIn, setLoggedIn, loading };
};

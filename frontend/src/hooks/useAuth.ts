import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import makeApiRequest from "../utils/MakeApiRequest";

export const useAuth = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(true);
	const [loggedIn, setLoggedIn] = React.useState(false);

	useEffect(() => {
		makeApiRequest({
			method: "get",
			url: "/api/v1/users/me",
		})
			.then(() => {
				setLoggedIn(true);
			})
			// eslint-disable-next-line
			.catch((error: any) => {
				console.error(error);
				setLoggedIn(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [navigate]);

	return { loggedIn, setLoggedIn, loading };
};

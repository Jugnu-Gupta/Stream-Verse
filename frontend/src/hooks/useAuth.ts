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
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				console.log(error.response.data.message);
				setLoading(false);
				setLoggedIn(false);
				// navigate("/login");
			});
	}, [navigate]);

	return { loggedIn, setLoggedIn, loading };
};

import React from "react";

const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.status !== 200) {
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};

export { fetchData };

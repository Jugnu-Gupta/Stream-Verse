import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	try {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	} catch (error) {
		return Promise.reject(error);
	}
});

export default axiosInstance;

import axios, { AxiosRequestConfig } from "axios";
// import makeApiRequest from "./MakeApiRequest";

let isRefreshing = false; // Tracks if a refresh token request is in progress
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}[] = []; // Queue to hold pending requests

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

const axiosInstance = axios.create({
	baseURL: "http://localhost:4000",
	// timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	try {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	} catch (error) {
		return Promise.reject(error);
	}
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If a refresh request is already in progress, queue the failed request
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					originalRequest.headers = originalRequest.headers || {};
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axiosInstance(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// Perform the refresh token request
				const refreshToken = localStorage.getItem("refreshToken");
				const response: any = await axios.post(
					"http://localhost:4000/api/v1/auths/refresh-token",
					{ refreshToken }
				);

				const newAccessToken = response.data.accessToken; // Replace with the actual field from the response
				localStorage.setItem("accessToken", newAccessToken);
				localStorage.setItem(
					"refreshToken",
					response.data.refreshToken
				);

				processQueue(null, newAccessToken); // Resolve all pending requests with the new token
				originalRequest.headers = originalRequest.headers || {};
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null); // Reject all pending requests
				throw refreshError;
			} finally {
				isRefreshing = false; // Reset the flag
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;

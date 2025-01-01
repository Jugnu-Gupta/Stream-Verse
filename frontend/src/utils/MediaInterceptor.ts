import axios, { AxiosRequestConfig } from "axios";
import makeApiRequest from "./MakeApiRequest";
import axiosInstance from "./Interceptor";
import { BASE_URL } from "../Constants";
import Cookies from "js-cookie";

// Tracks if a refresh token request is in progress
let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}[] = []; // Queue to hold pending requests

// eslint-disable-next-line
const processQueue = (error: any, token: string | null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});
	failedQueue = [];
};

const axiosMediaInstance = axios.create({
	baseURL: BASE_URL,
	// timeout: 10000,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

axiosMediaInstance.interceptors.request.use((config) => {
	try {
		const token = Cookies.get("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	} catch (error) {
		return Promise.reject(error);
	}
});

axiosMediaInstance.interceptors.response.use(
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
				const refreshToken = Cookies.get("refreshToken");
				// eslint-disable-next-line
				const { data }: any = await makeApiRequest({
					method: "post",
					url: "/api/v1/auths/refresh-token",
					data: { refreshToken },
				});

				const newAccessToken = data.accessToken; // Replace with the actual field from the response
				localStorage.setItem("accessToken", newAccessToken);
				localStorage.setItem("refreshToken", data.refreshToken);

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

export default axiosMediaInstance;

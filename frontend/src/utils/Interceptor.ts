import axios, { AxiosRequestConfig } from "axios";
import makeApiRequest from "./MakeApiRequest";
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

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
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

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If a refresh request is already in progress, queue the failed request
				if (originalRequest.url === "/api/v1/auths/refresh-token") {
					Cookies.remove("accessToken");
					Cookies.remove("refreshToken");
					return Promise.reject(error);
				} else {
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					}).then((token) => {
						originalRequest.headers = originalRequest.headers || {};
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return axiosInstance(originalRequest);
					});
				}
			}

			// If the error is not due to token expiration
			if (error.response?.data?.message !== "jwt expired") {
				Cookies.remove("accessToken");
				Cookies.remove("refreshToken");
				return Promise.reject(error);
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = Cookies.get("refreshToken");
				// eslint-disable-next-line
				const { data }: any = await makeApiRequest({
					method: "post",
					url: "/api/v1/auths/refresh-token",
					data: { refreshToken },
				});

				const newAccessToken = data.accessToken; // Replace with the actual field from the response
				Cookies.set("accessToken", newAccessToken);
				Cookies.set("refreshToken", data.refreshToken);

				processQueue(null, newAccessToken); // Resolve all pending requests with the new token
				originalRequest.headers = originalRequest.headers || {};
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null); // Reject all pending requests
				throw new Error("Error refreshing token");
			} finally {
				isRefreshing = false; // Reset the flag
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;

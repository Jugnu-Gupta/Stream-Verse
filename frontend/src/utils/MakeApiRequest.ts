import axiosInstance from "./Interceptor";

interface FormData {
	[key: string]: unknown;
}
// A generic type for form values

interface ApiRequestOptions {
	method: "get" | "post" | "put" | "delete";
	url: string;
	data?: FormData;
	params?: FormData;
}

const makeApiRequest = async ({
	method,
	url,
	data,
	params,
}: ApiRequestOptions): Promise<unknown> => {
	try {
		const res = await axiosInstance({
			method,
			url,
			data,
			params,
		});
		return res.data;
	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error;
	}
};

export default makeApiRequest;
export type { ApiRequestOptions };

// Usage example for a GET request
// makeApiRequest({
// 	method: "get",
// 	url: "/api/v1/auths/profile",
// 	params: { userId: "12345" },
// })
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error("Failed to fetch profile:", error));

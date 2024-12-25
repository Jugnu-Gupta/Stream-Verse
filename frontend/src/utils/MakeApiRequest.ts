import axiosInstance from "./Interceptor";

interface FormData {
	[key: string]: unknown;
}
// A generic type for form values

interface ApiRequestOptions {
	method: "get" | "post" | "put" | "delete" | "patch";
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

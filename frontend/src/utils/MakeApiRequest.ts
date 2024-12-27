import axiosInstance from "./Interceptor";
import axiosMediaInstance from "./MediaInterceptor";

interface CustomFormData {
	[key: string]: unknown;
}
// A generic type for form values

interface ApiRequestOptions {
	method: "get" | "post" | "put" | "delete" | "patch";
	url: string;
	data?: CustomFormData | FormData;
	params?: CustomFormData;
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

const makeApiMediaRequest = async ({
	method,
	url,
	data,
	params,
}: ApiRequestOptions): Promise<unknown> => {
	try {
		const res = await axiosMediaInstance({
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
export { makeApiMediaRequest };
export type { ApiRequestOptions };

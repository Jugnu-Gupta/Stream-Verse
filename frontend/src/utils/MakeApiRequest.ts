import axiosInstance from "./Interceptor";
import axiosMediaInstance from "./MediaInterceptor";
import { AxiosProgressEvent } from "axios";

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
interface ApiMediaRequestOptions extends ApiRequestOptions {
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
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
		console.error(error);
		throw error;
	}
};

const makeApiMediaRequest = async ({
	method,
	url,
	data,
	params,
	onUploadProgress,
}: ApiMediaRequestOptions): Promise<unknown> => {
	try {
		const res = await axiosMediaInstance({
			method,
			url,
			data,
			params,
			onUploadProgress,
		});
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default makeApiRequest;
export { makeApiMediaRequest };
export type { ApiRequestOptions, ApiMediaRequestOptions };

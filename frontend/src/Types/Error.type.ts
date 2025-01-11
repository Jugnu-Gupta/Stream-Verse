interface ErrorType {
	response: {
		data: {
			data: any; // eslint-disable-line
			errors: unknown[];
			message: string;
			statusCode: number;
			stack: string;
			success: boolean;
		};
	};
}

export type { ErrorType };

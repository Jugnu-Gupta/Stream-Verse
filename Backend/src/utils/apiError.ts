class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode: number,
        message = "Something went Wrong",
        errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack !== "") {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

        // Make message and stack enumerable
        Object.defineProperty(this, "message", {
            enumerable: true,
            value: message,
            writable: true,
            configurable: true,
        });

        Object.defineProperty(this, "stack", {
            enumerable: true,
            value: stack,
            writable: true,
            configurable: true,
        });
    }
}

export { ApiError };

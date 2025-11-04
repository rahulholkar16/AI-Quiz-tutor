interface IApiErrors {
    statusCode: number,
    message: string,
    success: boolean,
    errors?: unknown
}

class ApiError extends Error implements IApiErrors  {
    statusCode: number;
    message: string;
    success: boolean;
    errors?: unknown;
    constructor ( statusCode: number, message: string = "Something went wrong", errors?: unknown, stack?: string ) {
        super(message)
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
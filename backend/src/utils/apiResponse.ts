interface IApiResponse <T = any> {
    statusCode: number,
    data?: T,
    message: string,
    success: boolean
}

class ApiResponse <T = any> implements IApiResponse <T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
    constructor (statusCode: number, data: T, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };
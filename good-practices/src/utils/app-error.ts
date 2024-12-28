import { ENV } from "@utils/environment";

interface StatusError {
    statusCode: number;
    message: string;
}

class AppError extends Error {
    public readonly statusCode: number;

    constructor({ statusCode, message }: StatusError) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

const ErrorHandler = (error: any): AppError => {
    if (error instanceof AppError) return error;
    return new AppError(ENV.ERROR_DICTIONARY.SERVER_ERROR);
};

export { AppError, ErrorHandler };
class AppError extends Error {
    public readonly httpCode: number;

    constructor(httpCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

export { AppError };
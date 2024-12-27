import { STATUS_CODES } from 'http';

import { Logger, LogType } from '../services/logger.service';
import { LambdaResponse } from './interfaces';

const responseLambda = (statusCode: number, detail: string, body?: unknown): LambdaResponse => {
    const response = {
        status: {
            statusCode,
            message: STATUS_CODES[statusCode],
            detail
        },
        body,
    };
    Logger.log(LogType.INFO, 'Response', '', { response });
    return response as LambdaResponse;
};

export { responseLambda };
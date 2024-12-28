import { STATUS_CODES } from 'http';

import { Logger, LogType } from '@services/common/logger.service';

interface LambdaResponse {
    status: Status;
    body?: unknown;
}

interface Status {
    statusCode: number;
    message: string;
    detail: string;
}

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
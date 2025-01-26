import { createServer, IncomingMessage, ServerResponse } from 'http';

import { LoginHistoryController } from '@controllers/login-history.controller';
import { DynamoDB } from '@services/common/dynamoDB.service';
import { EventRequest } from '@services/common/event-request.service';
import { ValidateRequest } from '@services/common/validate-request.service';
import { LoginHistoryService } from '@services/login-history.service';
import { Logger, LogType } from '@services/common/logger.service';
import { Body, EventType } from '@utils/interfaces';
import { responseLambda } from '@utils/response';
import { AppError, ErrorHandler } from '@utils/app-error';
import { ENV } from '@utils/environment';
import extractionUsers from '@utils/schemas/extraction-users.json';

const parseRequestBody = (req: IncomingMessage): Promise<Body> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {                
                resolve(JSON.parse(body) as Body);
            } catch (error) {
                reject(new AppError(ENV.ERROR_DICTIONARY.PARSE_REQUEST));
            }
        });
    });
};

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/test' && req.method === 'POST') {
        try {
            Logger.log(LogType.INFO, 'Get extraction users');
            const requestBody = await parseRequestBody(req);
            ValidateRequest.validate(extractionUsers, requestBody);
            const eventRequest = new EventRequest<Body>({ headers: req.headers, body: requestBody } as EventType<Body>);
            const dynamoDB = new DynamoDB();
            const service = new LoginHistoryService(dynamoDB, eventRequest);
            const controller = new LoginHistoryController(service, eventRequest);
            const response = await controller.get();
            Logger.log(LogType.INFO, 'Extraction users retrieved', '', { response });
            res.end(JSON.stringify(responseLambda(ENV.HTTP_STATUS_CODE.OK, '', response)));
        } catch (error) {
            Logger.log(LogType.ERROR, 'ERROR', 'Error in getAdminPersonas', { error });
            const { statusCode, message } = ErrorHandler(error);
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseLambda(statusCode, message)));
        }
    } else {

        res.writeHead(ENV.HTTP_STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
};

const server = createServer(requestListener);

server.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});
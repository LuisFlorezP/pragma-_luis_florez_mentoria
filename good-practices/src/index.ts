import { createServer, IncomingMessage, ServerResponse, STATUS_CODES } from 'http';

import { AdminPersonas } from './controllers/admin-personas.controller';
import { DynamoDB } from './services/dynamoDB.service';
import { Security } from './services/security.service';
import { EventRequest } from './services/event-request.service';
import { ValidateRequest } from './services/validate-request.service';
import { Body, EventType } from './utils/interfaces';
import { responseLambda } from './utils/response';
import { AppError } from './utils/app-error';
import { ENV } from './utils/environment';
import extractionUsers from './utils/schemas/extraction-users.json';

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
                reject(new AppError(ENV.HTTP_STATUS_CODE.BAD_REQUEST, 'Bad Request'));
            }
        });
    });
};

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/test' && req.method === 'POST') {
        try {
            const requestBody = await parseRequestBody(req);
            ValidateRequest.validate(extractionUsers, requestBody);
            const eventRequest = new EventRequest<Body>({ headers: req.headers, body: requestBody } as EventType<Body>);
            const security = new Security<Body>(eventRequest);
            const dynamoDB = new DynamoDB();
            const adminPersonas = new AdminPersonas(dynamoDB, security, eventRequest);
            const result = await adminPersonas.getExtractionUsers();
            res.end(JSON.stringify(responseLambda(ENV.HTTP_STATUS_CODE.OK, '', result)));
        } catch (error) {
            const { httpCode = 500, message } = error as AppError;
            res.writeHead(httpCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseLambda(httpCode, message)));
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
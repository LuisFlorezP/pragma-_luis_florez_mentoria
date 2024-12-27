import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, QueryCommandInput, QueryCommandOutput, ScanCommand, ScanCommandInput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

import { Logger, LogType } from './logger.service';
import { History } from '../utils/interfaces';

class DynamoDB {
    private static dynamoDB: DynamoDBDocumentClient;

    constructor() {
        if (!DynamoDB.dynamoDB) DynamoDB.dynamoDB = DynamoDBDocumentClient.from(new DynamoDBClient({}));
    }

    private query = async (params: QueryCommandInput): Promise<QueryCommandOutput> => await DynamoDB.dynamoDB.send(new QueryCommand(params));

    private scan = async (params: ScanCommandInput): Promise<ScanCommandOutput> => await DynamoDB.dynamoDB.send(new ScanCommand(params));

    public queryLoginHistory = async (traceID: string, params: QueryCommandInput): Promise<History[]> => {
        Logger.log(LogType.INFO, `queryLoginHistory - ${traceID}`, 'Params to query', { params });
        // return ((await this.query(params)).Items as History[]);

        return [];
    }

    public scanDataAdminPersonas = async (traceID: string, params: QueryCommandInput): Promise<History[]> => {
        Logger.log(LogType.INFO, `scanDataAdminPersonas - ${traceID}`, 'Params to scan', { params });
        // return ((await this.scan(params)).Items as History[]);

        return [{
            cis: '123456',
            username: 'jdoe',
            firstLogin: 1627849200,
            name: 'John Doe',
            email: 'jdoe@example.com',
            'first-login-exampleName': 1627849200,
            'last-login-svp': 1627849200,
            'last-login-app': 1627849200,
            'first-login-svp': 1627849200,
            'first-login-app': 1627849200
        }];
    }
}

export { DynamoDB };
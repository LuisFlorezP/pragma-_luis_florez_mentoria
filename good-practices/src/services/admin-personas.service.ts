import { DynamoDB } from '@services/common/dynamoDB.service';
import { EventRequest } from '@services/common/event-request.service';
import { DateService } from '@services/common/date.service';
import { Logger, LogType } from '@services/common/logger.service';
import { ENV } from '@utils/environment';
import { AppError } from '@utils/app-error';
import { Body, ExtractionUsers, History, RangeMonthsUnix } from '@utils/interfaces';

class AdminPersonasService {
    constructor(
        private dynamoDB: DynamoDB,
        private eventRequest: EventRequest<Body>,
    ) { }

    public getExtractionUsers = async (): Promise<ExtractionUsers[]> => {
        const body = this.eventRequest.getBody();
        const traceID = String(this.eventRequest.getHeaders()[ENV.HEADERS.traceID]).split("1-")[1];
        const aditionalParams = {
            expressionAttributeValues: {},
            filterExpression: '',
        };

        if (!body.registrationDate || !body.lastEntryDate) {
            if (body.lastEntryDate) return await this.getLoginHistory(body.name, traceID);
            this.updateParamsWithoutDates(aditionalParams);
            return await this.getAdminPersonas(body, aditionalParams, traceID);
        }

        this.validRangeDate(traceID, 'registrationDate', body.registrationDate.to, body.registrationDate.from);
        this.validRangeDate(traceID, 'lastEntryDate', body.lastEntryDate.to, body.lastEntryDate.from);
        this.updateParamsWithDates(body, aditionalParams);

        return await this.getAdminPersonas(body, aditionalParams, traceID);
    }

    private updateParamsWithoutDates = (params: any): void => {
        const { registrationDateFrom, registrationDateTo } = this.getRangeMonthsUnix();
        params.filterExpression += '#FIRSTLOGIN between :date_registration_from and :date_registration_to';
        params.expressionAttributeValues = {
            ':date_registration_from': registrationDateFrom,
            ':date_registration_to': registrationDateTo
        };
    }

    private getRangeMonthsUnix = (): RangeMonthsUnix => {
        const registrationDateTo = DateService.toUnix();
        let registrationDateFrom: string | number = DateService.format('YYYYMMDD', DateService.subtract(3, 'months')).concat('000000000');
        registrationDateFrom = DateService.toUnix(DateService.format('YYYYMMDD HH:mm:ss', registrationDateFrom));
        return { registrationDateFrom, registrationDateTo };
    }

    private updateParamsWithDates = ({ registrationDate, lastEntryDate }: Body, params: any): void => {
        params.filterExpression = '#FIRSTLOGIN between :date_registration_from and :date_registration_to AND #LASTLOGIN between :date_last_entry_from and :date_last_entry_to';
        params.expressionAttributeValues = {
            ':date_registration_from': this.getDateInUnix(registrationDate!.from.concat('000000000')),
            ':date_registration_to': this.getDateInUnix(registrationDate!.to.concat('235959999')),
            ':date_last_entry_from': this.getDateInUnix(lastEntryDate!.from.concat('000000000')),
            ':date_last_entry_to': this.getDateInUnix(lastEntryDate!.to.concat('235959999'))
        };
    }

    private validRangeDate = (traceID: string, dateType: string, dateTo: string, dateFrom: string): void => {
        const differenceMonths = DateService.difference(dateTo, dateFrom, 'months');
        if (differenceMonths > 3) {
            Logger.log(LogType.ERROR, `INVALID RANGE DATE - ${traceID}`, `Invalid range date ${dateType} - ${differenceMonths} months difference`);
            throw new AppError(ENV.ERROR_DICTIONARY.RANGE_DATA);
        }
    }

    private getLoginHistory = async (name: string | undefined, traceID: string): Promise<ExtractionUsers[]> => {
        const params = {
            IndexName: ENV.TABLES.HISTORY_DETAIL.SECUNDARY_INDEX,
            TableName: ENV.TABLES.HISTORY_DETAIL.NAME,
            KeyConditionExpression: '#CHANNEL = :ch AND #DATE BETWEEN :date_last_entry_from AND :date_last_entry_to',
            ExpressionAttributeNames: {
                '#CHANNEL': 'lastLoginChannel',
                '#DATE': 'date',
            },
            ExpressionAttributeValues: {
                ':date_last_entry_from': 0,
                ':date_last_entry_to': 0,
                ':ch': name,
            },
        };
        let response: History[] = [];
        if (name) {
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY - ${traceID}`, '', { params });
            response = await this.dynamoDB.queryLoginHistory(traceID, params);
        } else {
            let promises: Promise<any>[] = [];
            params.ExpressionAttributeValues[':ch'] = ENV.CHANNELS.SVP;
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY SVP - ${traceID}`, '', { params });
            promises.push(this.dynamoDB.queryLoginHistory(traceID, params));
            params.ExpressionAttributeValues[':ch'] = ENV.CHANNELS.APP;
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY APP - ${traceID}`, '', { params });
            promises.push(this.dynamoDB.queryLoginHistory(traceID, params));
            const results = await Promise.all(promises);
            results.forEach(resp => response = response.concat(resp));
        }
        return this.formatHistoryResponse(traceID, response);
    }

    private formatHistoryResponse = (traceID: string, history: History[]): ExtractionUsers[] => {
        if (history.length > 0) {
            const responseBody: ExtractionUsers[] = history.map(item => {
                const date = this.formatDate(item.date);
                return {
                    cis: item.cis,
                    username: item.username,
                    registrationDate: date,
                    name: item.name,
                    email: item.email,
                    lastEntryDate: {
                        svp: date,
                        app: date
                    },
                    firstEntryDate: {
                        svp: date,
                        app: date
                    }
                };
            });
            Logger.log(LogType.INFO, `Auditoria - ${traceID}`, `El usuario ${this.eventRequest.getTokenPayload().sub} ha consultado el registro`, { responseBody });
            return responseBody;
        } else {
            throw new AppError(ENV.ERROR_DICTIONARY.DATA_NOT_FOUND);
        }
    }

    private getAdminPersonas = async (body: Body, aditionalParams: any, traceID: string): Promise<ExtractionUsers[]> => {
        const params = {
            TableName: ENV.TABLES.HISTORY_DETAIL.NAME,
            FilterExpression: aditionalParams.filterExpression,
            ExpressionAttributeValues: aditionalParams.expressionAttributeValues,
            ProjectionExpression: `#USERNAME, #CIS, #NAME, #EMAIL, #FIRSTLOGIN, #LASTLOGIN, #LASTLOGINCHANNEL, #FIRSTLOGINAPP, #LASTLOGINAPP, #FIRSTLOGINSVP, #LASTLOGINSVP`,
            ExpressionAttributeNames: {
                '#USERNAME': 'username',
                '#CIS': 'cis',
                '#NAME': 'name',
                '#EMAIL': 'email',
                '#FIRSTLOGIN': 'firstLogin',
                '#LASTLOGIN': 'lastLogin',
                '#LASTLOGINCHANNEL': 'lastLoginChannel',
                '#FIRSTLOGINAPP': 'first-login-app',
                '#LASTLOGINAPP': 'last-login-app',
                '#FIRSTLOGINSVP': 'first-login-svp',
                '#LASTLOGINSVP': 'last-login-svp',
            },
        };
        let response: History[] = await this.dynamoDB.scanDataAdminPersonas(traceID, params);
        if (body.name) response = response.filter(item => item[`first-login-${body.name}`]);
        else response = response.filter(item => item[`first-login-${ENV.CHANNELS.SVP}`] || item[`first-login-${ENV.CHANNELS.APP}`]);
        return this.formatAdminPersonasResponse(traceID, response);
    }

    private formatAdminPersonasResponse = (traceID: string, history: History[]): ExtractionUsers[] => {
        if (history.length > 0) {
            const responseBody: ExtractionUsers[] = history.map(item => {
                return {
                    cis: item.cis,
                    username: item.username,
                    registrationDate: this.formatDate(item.firstLogin),
                    name: item.name,
                    email: item.email,
                    lastEntryDate: {
                        svp: this.formatDate(item['last-login-svp']),
                        app: this.formatDate(item['last-login-app'])
                    },
                    firstEntryDate: {
                        svp: this.formatDate(item['first-login-svp']),
                        app: this.formatDate(item['first-login-app'])
                    }
                };
            });
            Logger.log(LogType.INFO, `Auditoria - ${traceID}`, `El usuario ${this.eventRequest.getTokenPayload().sub} ha consultado el registro`, { responseBody });
            return responseBody;
        } else {
            throw new AppError(ENV.ERROR_DICTIONARY.DATA_NOT_FOUND);
        }
    }

    private formatDate = (date: number): string => DateService.format('YYYYMMDD HH:mm:ss', new Date(date * 1000));

    private getDateInUnix = (date: string): number => DateService.toUnix(date);
}

export { AdminPersonasService };
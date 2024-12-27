import { DynamoDB } from '../services/dynamoDB.service';
import { Security } from '../services/security.service';
import { EventRequest } from '../services/event-request.service';
import { DateUtils } from '../services/date-utils.service';
import { Logger, LogType } from '../services/logger.service';
import { ENV } from '../utils/environment';
import { AppError } from '../utils/app-error';
import { Body, ExtractionUsers, History, LambdaResponse, RangeMonthsUnix, TokenPayload } from '../utils/interfaces';

class AdminPersonas {
    constructor(
        private dynamoDB: DynamoDB,
        private security: Security<Body>,
        private eventRequest: EventRequest<Body>,
    ) { }

    public getExtractionUsers = async (): Promise<ExtractionUsers[]> => {
        try {
            const body = this.eventRequest.getBody();
            const traceID = String(this.eventRequest.getHeaders()[ENV.HEADERS.traceID]).split("1-")[1];
            const tokenPayload = this.security.getPayload();
            let registrationDateTo = 0, registrationDateFrom = 0, lastEntryDateFrom = 0, lastEntryDateTo = 0;
            let aditionalParams = {
                expressionAttributeValues: {},
                filterExpression: '',
            };
            if (body.registrationDate || body.lastEntryDate) {
                if (body.registrationDate) {
                    this.validRangeDate(body.registrationDate.from, body.registrationDate.to, 'registrationDate', traceID);
                    this.updateParamsWithRegistrationDate(body, registrationDateFrom, registrationDateTo, aditionalParams);
                }
                if (body.lastEntryDate) {
                    this.validRangeDate(body.lastEntryDate.from, body.lastEntryDate.to, 'lastEntryDate', traceID);
                    this.updateParamsWithLastEntryDate(body, lastEntryDateFrom, lastEntryDateTo, aditionalParams);
                }
                if (!body.registrationDate && body.lastEntryDate) {
                    return await this.getHistoryLogin(body.name, lastEntryDateFrom, lastEntryDateTo, tokenPayload, traceID);
                }
            } else {
                this.updateParamsWithoutDates(aditionalParams);
            }
            return await this.getAdminPersonas(body, aditionalParams, tokenPayload, traceID);
        } catch (error) {
            Logger.log(LogType.ERROR, 'ERROR', '', { error });
            if (error instanceof AppError) {
                throw new AppError(error.httpCode, error.message);
            } else {
                throw new AppError(ENV.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, 'Unknown error');
            }
        }
    }

    private updateParamsWithoutDates = (params: any): void => {
        let { registrationDateFrom, registrationDateTo } = this.getRangeMonthsUnix();
        params.filterExpression += '#FIRSTLOGIN between :date_registration_from and :date_registration_to';
        params.expressionAttributeValues = {
            ':date_registration_from': registrationDateFrom,
            ':date_registration_to': registrationDateTo
        };
    }

    private updateParamsWithRegistrationDate = (body: Body, registrationDateFrom: number, registrationDateTo: number, params: any): void => {
        registrationDateFrom = DateUtils.toUnix(DateUtils.getMoment(body.registrationDate!.from.concat('000000000'), 'YYYYMMDD HH:mm:ss'));
        registrationDateTo = DateUtils.toUnix(DateUtils.getMoment(body.registrationDate!.to.concat('235959999'), 'YYYYMMDD HH:mm:ss'));
        params.filterExpression = '#FIRSTLOGIN between :date_registration_from and :date_registration_to';
        params.expressionAttributeValues = {
            ':date_registration_from': registrationDateFrom,
            ':date_registration_to': registrationDateTo
        };
    }

    private updateParamsWithLastEntryDate = (body: Body, lastEntryDateFrom: number, lastEntryDateTo: number, params: any): void => {
        lastEntryDateFrom = DateUtils.toUnix(DateUtils.getMoment(body.lastEntryDate!.from.concat('000000000'), 'YYYY-MM-DD HH:mm:ss'));
        lastEntryDateTo = DateUtils.toUnix(DateUtils.getMoment(body.lastEntryDate!.to.concat('235959999'), 'YYYY-MM-DD HH:mm:ss'));
        const expression = '#LASTLOGIN between :date_last_entry_from and :date_last_entry_to';
        params.filterExpression += params.filterExpression === '' ? expression : ` AND ${expression}`;
        params.expressionAttributeValues = {
            ...params.expressionAttributeValues,
            ':date_last_entry_from': lastEntryDateFrom,
            ':date_last_entry_to': lastEntryDateTo
        };
    }

    private validRangeDate = (from: string, to: string, dateType: string, traceID: string): void => {
        const format = 'YYYYMMDD';
        const dateFrom = DateUtils.getMoment(from, format);
        const dateTo = DateUtils.getMoment(to, format);
        const diffMonths = DateUtils.difference(dateTo, dateFrom, 'months');
        if (diffMonths > 3) {
            Logger.log(LogType.ERROR, `INVALID RANGE DATE - ${traceID}`, `Invalid range date ${dateType} - ${diffMonths} months difference`);
            throw new AppError(ENV.HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid range date');
        }
    }

    private getHistoryLogin = async (name: string | undefined, dateFrom: number, dateTo: number, tokenPayload: TokenPayload, traceID: string): Promise<ExtractionUsers[]> => {
        const params = {
            IndexName: ENV.TABLES.HISTORY_DETAIL.SECUNDARY_INDEX,
            TableName: ENV.TABLES.HISTORY_DETAIL.NAME,
            KeyConditionExpression: '#CHANNEL = :ch AND #DATE BETWEEN :date_last_entry_from AND :date_last_entry_to',
            ExpressionAttributeNames: {
                '#CHANNEL': 'lastLoginChannel',
                '#DATE': 'date',
            },
            ExpressionAttributeValues: {
                ':date_last_entry_from': dateFrom,
                ':date_last_entry_to': dateTo,
                ':ch': name,
            },
        };
        let response: History[] = [];
        if (name === undefined) {
            let promises: Promise<any>[] = [];
            params.ExpressionAttributeValues[':ch'] = ENV.CHANNELS.SVP;
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY SVP - ${traceID}`, '', { params });
            promises.push(this.dynamoDB.queryLoginHistory(traceID, params));
            params.ExpressionAttributeValues[':ch'] = ENV.CHANNELS.APP;
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY APP - ${traceID}`, '', { params });
            promises.push(this.dynamoDB.queryLoginHistory(traceID, params));
            let results = await Promise.all(promises);
            results.forEach(resp => response = response.concat(resp));
        } else {
            Logger.log(LogType.DEBUG, `QUERY LOGIN HISTORY - ${traceID}`, '', { params });
            response = await this.dynamoDB.queryLoginHistory(traceID, params);
        }
        return this.formatHistoryResponse(traceID, response, tokenPayload);
    }

    private formatHistoryResponse = (traceID: string, history: History[], tokenPayload: TokenPayload): ExtractionUsers[] => {
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
            Logger.log(LogType.INFO, `Auditoria - ${traceID}`, `El usuario ${tokenPayload.sub} ha consultado el registro`, { responseBody });
            return responseBody;
        } else {
            throw new AppError(ENV.HTTP_STATUS_CODE.NOT_FOUND, 'No se ha encontrado resultados con los parámetros');
        }
    }

    private getAdminPersonas = async (body: Body, aditionalParams: any, tokenPayload: TokenPayload, traceID: string): Promise<ExtractionUsers[]> => {
        const params = {
            TableName: ENV.TABLES.HISTORY_DETAIL.NAME,
            FilterExpression: aditionalParams.filterExpression,
            ExpressionAttributeValues: aditionalParams.expressionAttributeValues,
            ProjectionExpression: `#USERNAME, #CIS, #NAME, #EMAIL, #FIRSTLOGIN, ` +
                `#LASTLOGIN, #LASTLOGINCHANNEL, #FIRSTLOGINAPP, #LASTLOGINAPP, #FIRSTLOGINSVP, #LASTLOGINSVP`,
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
        Logger.log(LogType.DEBUG, `Database response - ${traceID}`, '', { response });
        return this.formatAdminPersonasResponse(traceID, response, tokenPayload);
    }

    private formatAdminPersonasResponse = (traceID: string, history: History[], tokenPayload: TokenPayload): ExtractionUsers[] => {
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
            Logger.log(LogType.INFO, `Auditoria - ${traceID}`, `El usuario ${tokenPayload.sub} ha consultado el registro`, { responseBody });
            return responseBody;
        } else {
            throw new AppError(ENV.HTTP_STATUS_CODE.NOT_FOUND, 'No se ha encontrado resultados con los parámetros');
        }
    }

    private formatDate = (date: number) => {
        const format = 'YYYYMMDD HH:mm:ss';
        return date ? DateUtils.format(format, DateUtils.getMoment(new Date(date * 1000), format)) : '';
    }

    private getRangeMonthsUnix = (): RangeMonthsUnix => {
        let registrationDateTo = DateUtils.toUnix();
        let registrationDateFrom: string | number = DateUtils.format('YYYYMMDD', DateUtils.subtract(3, 'months')).concat('000000000');
        registrationDateFrom = DateUtils.format('YYYYMMDD HH:mm:ss', registrationDateFrom);
        registrationDateFrom = DateUtils.toUnix(DateUtils.getMoment(registrationDateFrom));
        if (registrationDateFrom && registrationDateTo) {
            return {
                registrationDateFrom: registrationDateFrom,
                registrationDateTo: registrationDateTo
            };
        } else {
            Logger.log(LogType.ERROR, 'DATE ERROR', 'No dates were found');
            return {};
        }
    }
}

export { AdminPersonas };
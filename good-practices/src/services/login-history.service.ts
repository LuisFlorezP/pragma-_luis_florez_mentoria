import { DynamoDB } from '@services/common/dynamoDB.service';
import { EventRequest } from '@services/common/event-request.service';
import { DateService } from '@services/common/date.service';
import { Logger, LogType } from '@services/common/logger.service';
import { ENV } from '@utils/environment';
import { AppError } from '@utils/app-error';
import { AditionalDates, AditionalParams, Body, HistoryResponse, History, RangeMonthsUnix } from '@utils/interfaces';

class LoginHistoryService {
    constructor(
        private dynamoDB: DynamoDB,
        private eventRequest: EventRequest<Body>,
    ) { }

    public getLastLoginHistory = async (traceID: string, name?: string): Promise<HistoryResponse[]> => {
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
    };

    public getLoginHistory = async (traceID: string, body: Body): Promise<HistoryResponse[]> => {
        const { filterExpression, expressionAttributeValues } = this.getAditionalParams(traceID, body);
        const params = {
            TableName: ENV.TABLES.HISTORY_DETAIL.NAME,
            FilterExpression: filterExpression,
            ExpressionAttributeValues: expressionAttributeValues,
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
        let response: History[] = await this.dynamoDB.scanLoginHistory(traceID, params);
        if (body.name) response = response.filter(item => item[`first-login-${body.name}`]);
        else response = response.filter(item => item[`first-login-${ENV.CHANNELS.SVP}`] || item[`first-login-${ENV.CHANNELS.APP}`]);
        return this.formatHistoryResponse(traceID, response);
    };

    private formatHistoryResponse = (traceID: string, history: History[]): HistoryResponse[] => {
        if (history.length > 0) {
            const responseBody: HistoryResponse[] = history.map(item => ({
                cis: item.cis,
                username: item.username,
                name: item.name,
                email: item.email,
                ...this.getAditionalDates(item),
            }));
            Logger.log(LogType.INFO, `Auditoria - ${traceID}`, `El usuario ${this.eventRequest.getTokenPayload().sub} ha consultado el registro`, { responseBody });
            return responseBody;
        } else throw new AppError(ENV.ERROR_DICTIONARY.DATA_NOT_FOUND);
    };

    private getAditionalParams = (traceID: string, body: Body): AditionalParams => {
        if (!body.registrationDate || !body.lastEntryDate) {
            const { registrationDateFrom, registrationDateTo } = this.getRangeMonthsUnix();
            return {
                filterExpression: '#FIRSTLOGIN between :date_registration_from and :date_registration_to',
                expressionAttributeValues: {
                    ':date_registration_from': registrationDateFrom,
                    ':date_registration_to': registrationDateTo
                }
            };
        }

        this.validRangeDate(traceID, 'registrationDate', body.registrationDate.to, body.registrationDate.from);
        this.validRangeDate(traceID, 'lastEntryDate', body.lastEntryDate.to, body.lastEntryDate.from);

        return {
            filterExpression: '#FIRSTLOGIN between :date_registration_from and :date_registration_to AND #LASTLOGIN between :date_last_entry_from and :date_last_entry_to',
            expressionAttributeValues: {
                ':date_registration_from': this.getDateInUnix(body.registrationDate.from.concat('000000000')),
                ':date_registration_to': this.getDateInUnix(body.registrationDate.to.concat('235959999')),
                ':date_last_entry_from': this.getDateInUnix(body.lastEntryDate.from.concat('000000000')),
                ':date_last_entry_to': this.getDateInUnix(body.lastEntryDate.to.concat('235959999'))
            }
        };
    };

    private getRangeMonthsUnix = (): RangeMonthsUnix => ({
        registrationDateFrom: DateService.toUnix(DateService.format('YYYYMMDD HH:mm:ss', DateService.format('YYYYMMDD', DateService.subtract(3, 'months')).concat('000000000'))),
        registrationDateTo: DateService.toUnix()
    });

    private validRangeDate = (traceID: string, dateType: string, dateTo: string, dateFrom: string): void => {
        const differenceMonths = DateService.difference(dateTo, dateFrom, 'months');
        if (differenceMonths > 3) {
            Logger.log(LogType.ERROR, `INVALID RANGE DATE - ${traceID}`, `Invalid range date ${dateType} - ${differenceMonths} months difference`);
            throw new AppError(ENV.ERROR_DICTIONARY.RANGE_DATA);
        }
    };

    private getAditionalDates = (item: History): AditionalDates => {
        return item.date ? {
            registrationDate: this.getDateFormat(item.date),
            lastEntryDate: {
                svp: this.getDateFormat(item.date),
                app: this.getDateFormat(item.date)
            },
            firstEntryDate: {
                svp: this.getDateFormat(item.date),
                app: this.getDateFormat(item.date)
            }
        } : {
            registrationDate: this.getDateFormat(item.firstLogin),
            lastEntryDate: {
                svp: this.getDateFormat(item['last-login-svp']),
                app: this.getDateFormat(item['last-login-app'])
            },
            firstEntryDate: {
                svp: this.getDateFormat(item['first-login-svp']),
                app: this.getDateFormat(item['first-login-app'])
            }
        };
    };

    private getDateFormat = (date: number): string => DateService.format('YYYYMMDD HH:mm:ss', new Date(date * 1000));

    private getDateInUnix = (date: string): number => DateService.toUnix(date);
}

export { LoginHistoryService };
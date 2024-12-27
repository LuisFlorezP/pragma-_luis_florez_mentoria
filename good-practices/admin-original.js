const Ajv = require("ajv").default;
const jsonwebtoken = require('jsonwebtoken');

class AdminPersonasCtrl {

    constructor() {
        this.dabase = new DataBaseController();
    }

    async getExtractionUsers(event) {
        let microservice = 'get-extraction-users';
        let traceID = String(event.headers["X-Amzn-Trace-Id"]).split("1-")[1];
        const token = jsonwebtoken.decode(event.headers['Authorization'].split(' ')[1]);
        log.loggingMessage(log.INFO, log.messageRQ(microservice, traceID,
            event.headers && event.headers['User-Agent'] ? validator.whitelist(event.headers['User-Agent'], UserAgentRegEx) : "LambdaInvoke", event.resource, event.method,
            event.headers && event.headers['X-Forwarded-For'] ? validator.whitelist(event.headers['X-Forwarded-For'], XForwardRegEx) : "LambdaInvoke", ''));
        let response = {};
        let ajv = new Ajv();
        var valid = ajv.validate(schemasExtractionUsers.putSchema(), event.body);
        let registrationDateTo = null;
        let registrationDateFrom = null;
        let lastEntryDateFrom = null;
        let lastEntryDateTo = null;
        if (valid) {
            try {
                let params = {
                    tableName: LOGIN_HISTORY_DETAIL_TABLE_NAME,
                    projectionExpression: `#USERNAME, #CIS, #NAME, #EMAIL, #FIRSTLOGIN, ` +
                        `#LASTLOGIN, #LASTLOGINCHANNEL, #FIRSTLOGINAPP, #LASTLOGINAPP, #FIRSTLOGINSVP, #LASTLOGINSVP`,
                    expressionAttributeNames: {
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
                        '#LASTLOGINSVP': 'last-login-svp'
                    },
                    filterExpression: '',
                    expressionAttributeValues: {}
                };

                if (event.body.registrationDate || event.body.lastEntryDate) {
                    isValidRangeDate(event.body, traceID);
                    if (event.body.registrationDate) {
                        registrationDateFrom = event.body.registrationDate.from.concat('000000000');
                        registrationDateFrom = moment(registrationDateFrom, 'YYYYMMDD HH:mm:ss').unix();
                        registrationDateTo = event.body.registrationDate.to.concat('235959999');
                        registrationDateTo = moment(registrationDateTo, 'YYYYMMDD HH:mm:ss').unix();
                        params.filterExpression = '#FIRSTLOGIN between :date_registration_from and :date_registration_to';
                        params.expressionAttributeValues[':date_registration_from'] = registrationDateFrom;
                        params.expressionAttributeValues[':date_registration_to'] = registrationDateTo;
                    }
                    if (event.body.lastEntryDate) {
                        lastEntryDateFrom = event.body.lastEntryDate.from.concat('000000000');
                        lastEntryDateTo = event.body.lastEntryDate.to.concat('235959999');
                        lastEntryDateFrom = moment(lastEntryDateFrom, 'YYYY-MM-DD HH:mm:ss').unix();
                        lastEntryDateTo = moment(lastEntryDateTo, 'YYYY-MM-DD HH:mm:ss').unix();
                        let expression = '#LASTLOGIN between :date_last_entry_from and :date_last_entry_to';
                        params.filterExpression += params.filterExpression === '' ? expression : ` AND ${expression}`;
                        params.expressionAttributeValues[':date_last_entry_from'] = lastEntryDateFrom;
                        params.expressionAttributeValues[':date_last_entry_to'] = lastEntryDateTo;
                    }
                    if (!event.body.registrationDate && event.body.lastEntryDate) {
                        let getHistory = await this.getHistoryLogin(event.body.name, lastEntryDateFrom, lastEntryDateTo, traceID)
                        return formatResponse(traceID, microservice, getHistory, token);
                    }
                } else {
                    let rangeDate = getRangeMonthsUnix(traceID);
                    registrationDateFrom = rangeDate.registrationDateFrom;
                    registrationDateTo = rangeDate.registrationDateTo;
                    params.filterExpression += '#FIRSTLOGIN between :date_registration_from and :date_registration_to';
                    params.expressionAttributeValues[':date_registration_from'] = registrationDateFrom;
                    params.expressionAttributeValues[':date_registration_to'] = registrationDateTo;
                }

                params.expressionAttributeValues = DynamoDBValue.toDDB(params.expressionAttributeValues);

                const databaseRS = await this.dabase.scanDataAdminPersonas(traceID, params);
                if (event.body.name) {
                    databaseRS.Items = databaseRS.Items.filter(item => item[`first-login-${event.body.name}`]);
                } else {
                    databaseRS.Items = databaseRS.Items.filter(item => item[`first-login-${channels.svp}`] || item[`first-login-${channels.app}`]);
                }
                log.loggingEvent(log.DEBUG, traceID, ll, responseData, `${JSON.stringify(databaseRS)}`);
                if (databaseRS.Count > 0) {
                    let responseBody = [];
                    databaseRS.Items.forEach(item => {
                        let dynamoToJS = Object.assign({}, DynamoDBValue.toJavascript(item));
                        let rs = {
                            cis: dynamoToJS.cis,
                            username: dynamoToJS.username,
                            registrationDate: returnFormatDate(dynamoToJS.firstLogin),
                            name: dynamoToJS.name,
                            email: dynamoToJS.email,
                            lastEntryDate: {
                                svp: returnFormatDate(dynamoToJS['last-login-svp']),
                                app: returnFormatDate(dynamoToJS['last-login-app'])
                            },
                            firstEntryDate: {
                                svp: returnFormatDate(dynamoToJS['first-login-svp']),
                                app: returnFormatDate(dynamoToJS['first-login-app'])
                            }
                        }
                        responseBody.push(rs);
                    });
                    log.loggingEvent(log.INFO, traceID, ll, "Auditoria", `El usuario ${token.sub} ha consultado el registro ${JSON.stringify(responseBody)}`);
                    response = { status: SUCCESS, body: responseBody };
                    log.loggingMessage(log.INFO, log.messageRS(microservice, traceID, response.status.statusCode, "Success", "body", response.body));
                    return response;
                } else {
                    this.responseNotFoundResource(response, traceID);
                }
            } catch (err) {
                this.responseCatchInternalError(err, traceID);
            }

        } else {
            log.loggingEvent(log.ERROR, traceID, ll, "DATA ERROR", `Bad Request`);
            response = { status: BAD_REQUEST }
            throw responseToString(response);
        }

    }

}

module.exports = { AdminPersonasCtrl };
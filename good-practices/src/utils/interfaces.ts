interface EventType<T> {
    headers: Headers;
    body: T;
}

interface Headers {
    [key: string]: string;
    Authorization: string;
    'X-Amzn-Trace-Id': string;
    'Content-Type': string;
}

interface Body {
    registrationDate?: {
        from: string;
        to: string;
    };
    lastEntryDate?: {
        from: string;
        to: string;
    };
    name?: string;
}

interface HistoryResponse {
    cis: string;
    username: string;
    registrationDate: string;
    name: string;
    email: string;
    lastEntryDate: Channels;
    firstEntryDate: Channels;
}

interface History {
    cis: string;
    username: string;
    firstLogin: number;
    name: string;
    email: string;
    date?: number;
    'last-login-svp': number;
    'last-login-app': number;
    'first-login-svp': number;
    'first-login-app': number;
    [key: string]: any;
}

interface Channels {
    svp: string;
    app: string;
}

interface TokenPayload {
    aud: string;
    sub: string;
}

interface RangeMonthsUnix {
    registrationDateFrom?: number;
    registrationDateTo?: number;
}

interface AditionalDates {
    registrationDate: string;
    lastEntryDate: Channels;
    firstEntryDate: Channels;
}

interface AditionalParams {
    filterExpression: string;
    expressionAttributeValues: object;
}

interface Channels {
    svp: string;
    app: string;
}

export { EventType, Headers, Body, History, HistoryResponse, TokenPayload, RangeMonthsUnix, AditionalDates, AditionalParams };
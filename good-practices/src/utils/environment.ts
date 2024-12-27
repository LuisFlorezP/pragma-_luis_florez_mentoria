const PORT = process.env.PORT || 3000;

const HEADERS = {
    contentType: 'Content-Type',
    traceID: 'X-Amzn-Trace-Id',
};

const TABLES = {
    HISTORY_DETAIL: {
        NAME: process.env.LOGIN_HISTORY_DETAIL_TABLE_NAME || 'login-history-detail',
        SECUNDARY_INDEX: process.env.LOGIN_HISTORY_DETAIL_SECUNDARY_INDEX || 'login-history-detail-secundary-index',
    },
};

const HTTP_STATUS_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const CHANNELS = {
    SVP: 'svp',
    APP: 'app',
};

const ENV = {
    PORT,
    HEADERS,
    TABLES,
    HTTP_STATUS_CODE,
    CHANNELS,
} as const;

export { ENV };
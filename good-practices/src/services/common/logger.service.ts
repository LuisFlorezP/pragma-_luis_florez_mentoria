enum LogType {
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    ERROR = 'ERROR',
}

class Logger {
    public static log = (logType: LogType, message: string, detail?: string, objetc?: object): void => console.log(logType, message, detail, objetc);
}

export { LogType, Logger };
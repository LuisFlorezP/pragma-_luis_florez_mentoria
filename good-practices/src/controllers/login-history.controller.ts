import { LoginHistoryService } from '@services/login-history.service';
import { Logger, LogType } from '@services/common/logger.service';
import { AppError, ErrorHandler } from '@utils/app-error';
import { HistoryResponse } from '@utils/interfaces';

class LoginHistoryController {
    constructor(
        private service: LoginHistoryService,
    ) {}

    public async get(): Promise<HistoryResponse[]> {
        try {
            Logger.log(LogType.INFO, 'Get extraction users');
            const response = await this.service.get();
            Logger.log(LogType.INFO, 'Extraction users retrieved', '', { response });
            return response;
        } catch (error) {
            Logger.log(LogType.ERROR, 'ERROR', 'Error in getAdminPersonas', { error });
            const { statusCode, message } = ErrorHandler(error);
            throw new AppError({statusCode, message});
        }
    }
}

export { LoginHistoryController };
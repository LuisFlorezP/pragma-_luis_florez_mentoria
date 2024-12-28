import { AdminPersonasService } from '@services/admin-personas.service';
import { Logger, LogType } from '@services/common/logger.service';
import { AppError, ErrorHandler } from '@utils/app-error';
import { ExtractionUsers } from '@utils/interfaces';

class AdminPersonasController {
    constructor(
        private service: AdminPersonasService,
    ) {}

    public async get(): Promise<ExtractionUsers[]> {
        try {
            Logger.log(LogType.INFO, 'Get extraction users');
            const response = await this.service.getExtractionUsers();
            Logger.log(LogType.INFO, 'Extraction users retrieved', '', { response });
            return response;
        } catch (error) {
            Logger.log(LogType.ERROR, 'ERROR', 'Error in getAdminPersonas', { error });
            const { statusCode, message } = ErrorHandler(error);
            throw new AppError({statusCode, message});
        }
    }
}

export { AdminPersonasController };
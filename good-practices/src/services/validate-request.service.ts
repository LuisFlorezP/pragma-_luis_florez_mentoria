import Ajv from 'ajv';

import { AppError } from '../utils/app-error';
import { ENV } from '../utils/environment';

class ValidateRequest {
    private constructor() {}

    public static validate = (schema: object, body: unknown): void => {
        if (!(new Ajv().validate(schema, body))) throw new AppError(ENV.HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid request data');
    }
}

export { ValidateRequest };
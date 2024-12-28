import Ajv from 'ajv';

import { AppError } from '@utils/app-error';
import { ENV } from '@utils/environment';

class ValidateRequest {
    private static instance: Ajv;

    private static getInstance = (): Ajv => {
        if (!ValidateRequest.instance) {
            ValidateRequest.instance = new Ajv();
        }
        return ValidateRequest.instance;
    }

    public static validate = (schema: object, body: unknown): void => {
        const ajv = ValidateRequest.getInstance();
        const validate = ajv.validate(schema, body);

        if (!validate) throw new AppError(ENV.ERROR_DICTIONARY.JSON_SCHEMA);
    }
}

export { ValidateRequest };
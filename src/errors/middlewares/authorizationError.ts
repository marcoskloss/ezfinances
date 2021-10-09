import { CustomError } from '@src/errors/customError';

export class AuthorizationError extends CustomError {
    constructor(message: string, code = 401) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

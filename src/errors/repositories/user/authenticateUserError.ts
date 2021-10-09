import { CustomError } from '@src/errors/customError';

export class AuthenticateUserError extends CustomError {
    constructor(message: string, code: number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

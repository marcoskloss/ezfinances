import { CustomError } from './customError';

export class InternalError extends CustomError {
    constructor(message = INTERNAL_ERROR_MESSAGE, code = 500) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const INTERNAL_ERROR_MESSAGE = 'Ocorreu um erro interno!';

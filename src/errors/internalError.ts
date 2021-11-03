import { AppError } from './appError';

export class InternalError extends AppError {
    constructor(message = INTERNAL_ERROR_MESSAGE, code = 500) {
        super(message, code);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const INTERNAL_ERROR_MESSAGE = 'Ocorreu um erro interno!';

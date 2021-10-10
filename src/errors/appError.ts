import { CustomError } from './customError';

export class AppError extends CustomError {
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

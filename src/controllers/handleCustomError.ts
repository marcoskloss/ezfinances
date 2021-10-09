import { CustomError } from '@src/errors/customError';
import { INTERNAL_ERROR_MESSAGE } from '@src/errors/internalError';
import { Response } from '@src/util/http';

export function handleCustomError(error: unknown): Response {
    if (error instanceof CustomError) {
        return { error: error.message, status: error.code };
    }

    return {
        error: INTERNAL_ERROR_MESSAGE,
        status: 500,
    };
}

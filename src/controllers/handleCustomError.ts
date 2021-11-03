import { AppError } from '@src/errors/appError';
import { INTERNAL_ERROR_MESSAGE } from '@src/errors/internalError';
import { Response } from '@src/util/http';
import { log } from '@src/util/logger';

export function handleCustomError(error: unknown): Response {
    if (error instanceof AppError) {
        return { error: error.message, status: error.code };
    }

    log.error(error);
    return {
        error: INTERNAL_ERROR_MESSAGE,
        status: 500,
    };
}

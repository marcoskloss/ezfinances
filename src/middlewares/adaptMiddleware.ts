import { AppError } from '@src/errors/appError';
import { httpInternalErrorResponse, httpResponse } from '@src/util/http';
import {
    NextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';
import { Middleware } from './contract';

export function adaptMiddleware(middleware: Middleware): any {
    return async (
        req: ExpressRequest,
        res: ExpressResponse,
        next: NextFunction
    ): Promise<ExpressResponse | void> => {
        try {
            await middleware.exec(req);
            return next();
        } catch (error) {
            if (error instanceof AppError) {
                return httpResponse({
                    response: res,
                    status: error.code,
                    error: error.message,
                });
            }
            return httpInternalErrorResponse(res);
        }
    };
}

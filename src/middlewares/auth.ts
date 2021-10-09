import { CustomError } from '@src/errors/customError';
import { AuthorizationError } from '@src/errors/middlewares/authorizationError';
import { AuthService } from '@src/services/auth';
import {
    httpInternalErrorResponse,
    httpResponse,
    Request,
} from '@src/util/http';
import { NextFunction, Response as ExpressResponse } from 'express';
import { Middleware } from './contract';

export class AuthMiddleware implements Middleware {
    async exec(
        req: Request,
        res: ExpressResponse,
        next: NextFunction
    ): Promise<ExpressResponse | void> {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            throw new AuthorizationError('Sem autorização!');
        }

        const token = authHeader.split(' ')[1];

        if (!authHeader) {
            throw new AuthorizationError('Sem autorização!');
        }

        try {
            const decoded = AuthService.decodeToken(token);
            req.user_decoded = { ...decoded };
            return next();
        } catch (error) {
            if (error instanceof CustomError) {
                return httpResponse({
                    response: res,
                    status: error.code,
                    error: error.message,
                });
            }

            return httpInternalErrorResponse(res);
        }
    }
}

import { Request } from '@src/util/http';
import { NextFunction, Response as ExpressResponse } from 'express';

export interface Middleware {
    exec(
        request: Request,
        response: ExpressResponse,
        next: NextFunction
    ): Promise<ExpressResponse | void>;
}

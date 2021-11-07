import { INTERNAL_ERROR_MESSAGE } from '@src/errors/internalError';
import {
    Response as ExpressResponse,
    Request as ExpressRequest,
} from 'express';

export type httpResponse = {
    response: ExpressResponse;
    status: number;
    error?: string;
    data?: any;
};

export function httpResponse({
    response,
    status,
    data,
    error,
}: httpResponse): ExpressResponse {
    return response.status(status).json({
        error: error,
        status,
        data,
    });
}

export function httpInternalErrorResponse(
    response: ExpressResponse
): ExpressResponse {
    return response.status(500).json({ error: INTERNAL_ERROR_MESSAGE });
}

export interface Request<T = any> extends ExpressRequest {
    body: T;
    userId?: string;
}

export type Response<T = any> = {
    status?: number;
    data?: T;
    error?: string;
};

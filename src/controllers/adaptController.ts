import { httpResponse } from '@src/util/http';
import { Request, Response } from 'express';
import { Controller } from './contract';
import { handleCustomError } from './handleCustomError';

export function adaptController(controller: Controller) {
    return async (req: Request, res: Response): Promise<Response> => {
        let controllerResponse;
        try {
            controllerResponse = await controller.handle(req);
        } catch (error) {
            controllerResponse = handleCustomError(error);
        }

        return httpResponse({
            response: res,
            ...controllerResponse,
            status: controllerResponse?.status ?? 200,
        });
    };
}

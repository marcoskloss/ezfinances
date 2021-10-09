import { httpResponse } from '@src/util/http';
import { Request, Response } from 'express';
import { Controller } from './contract';

export function adaptController(controller: Controller) {
    return async (req: Request, res: Response): Promise<Response> => {
        const controllerResponse = await controller.handle(req);

        return httpResponse({
            response: res,
            ...controllerResponse,
        });
    };
}

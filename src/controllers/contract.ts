import { Request, Response } from '@src/util/http';
export interface Controller {
    handle(request: Request): Promise<Response>;
}

import { Request } from '@src/util/http';

export interface Middleware {
    exec(request: Request): Promise<void> | void;
}

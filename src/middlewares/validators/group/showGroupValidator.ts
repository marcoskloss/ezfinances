import { AppError } from '@src/errors/appError';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { isValidObjectId } from 'mongoose';

export class ShowGroupValidator implements Middleware {
    exec(req: Request): void {
        if (!isValidObjectId(req.params.groupId)) {
            throw new AppError('Grupo não encontrado!', 400);
        }
    }
}

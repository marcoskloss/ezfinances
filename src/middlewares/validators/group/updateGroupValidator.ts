import { isValidObjectId, Error } from 'mongoose';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { Group } from '@src/models/group';
import { AppError } from '@src/errors/appError';
import { log } from '@src/util/logger';
import { InternalError } from '@src/errors/internalError';

export class UpdateGroupValidator implements Middleware {
    async exec(req: Request): Promise<void> {
        try {
            isValidObjectId(req.body.id);

            const group = await Group.findOne({
                _id: req.body.id,
                user: req.userId,
            });

            if (!group) {
                throw new AppError('Grupo não encontrado!', 400);
            }
        } catch (error) {
            if (error instanceof Error.CastError) {
                throw new AppError('Grupo não encontrado!', 400);
            }

            if (error instanceof AppError) {
                throw error;
            }

            log.error(error);
            throw new InternalError();
        }
    }
}

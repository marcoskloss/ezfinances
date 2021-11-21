import { AppError } from '@src/errors/appError';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { isValidObjectId } from 'mongoose';

export class ShowTransactionValidator implements Middleware {
    exec(req: Request): void {
        if (!isValidObjectId(req.params.transactionId)) {
            throw new AppError('Transação não encontrada!', 400);
        }
    }
}

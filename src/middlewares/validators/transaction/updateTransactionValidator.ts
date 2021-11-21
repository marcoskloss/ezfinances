import { isValidObjectId, Error } from 'mongoose';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { Transaction } from '@src/models/transaction';
import { AppError } from '@src/errors/appError';
import { log } from '@src/util/logger';
import { InternalError } from '@src/errors/internalError';

export class UpdateTransactionValidator implements Middleware {
    async exec(req: Request): Promise<void> {
        try {
            isValidObjectId(req.params.transactionId);

            const transaction = await Transaction.findOne({
                _id: req.params.transactionId,
                user: req.userId,
            });

            if (!transaction) {
                throw new AppError('Transação não encontrada!', 400);
            }
        } catch (error) {
            if (error instanceof Error.CastError) {
                throw new AppError('Transação não encontrada!', 400);
            }

            if (error instanceof AppError) {
                throw error;
            }

            log.error(error);
            throw new InternalError();
        }
    }
}

import { Transaction } from '@src/models/transaction';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class DeleteTransactionController implements Controller {
    async handle(req: Request): Promise<Response> {
        await Transaction.deleteOne({
            _id: req.params.transactionId,
        });
        return { data: { id: req.params.transactionId } };
    }
}

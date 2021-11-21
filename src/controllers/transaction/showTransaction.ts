import { Transaction } from '@src/models/transaction';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class ShowTransactionController implements Controller {
    async handle(req: Request): Promise<Response> {
        const transaction = await Transaction.findOne({
            _id: req.params.transactionId,
        });

        return { data: transaction?.toJSON() };
    }
}

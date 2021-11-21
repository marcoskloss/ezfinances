import { Transaction } from '@src/models/transaction';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class ListTransactionsController implements Controller {
    async handle(req: Request): Promise<Response> {
        const transactions = await Transaction.find({ user: req.userId });

        return {
            data: transactions.map((item) => item.toJSON()),
        };
    }
}

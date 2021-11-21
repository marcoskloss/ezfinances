import { Transaction } from '@src/models/transaction';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

export class CreateTransactionController implements Controller {
    async handle(req: Request): Promise<Response> {
        const transaction = new Transaction({
            ...req.body,
            user: req.userId,
        });

        await transaction.save();

        return {
            status: 201,
            data: {
                ...transaction.toJSON(),
            },
        };
    }
}

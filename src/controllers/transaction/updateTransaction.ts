import { Transaction } from '@src/models/transaction';
import { Response, Request } from '@src/util/http';
import { Controller } from '../contract';

export class UpdateTransactionController implements Controller {
    async handle(req: Request): Promise<Response> {
        const where = {
            user: req.userId,
            _id: req.params.transactionId,
        };

        await Transaction.updateOne(where, req.body);
        return { status: 200 };
    }
}

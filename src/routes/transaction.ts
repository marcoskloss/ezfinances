import { Router } from 'express';
import { adaptController } from '@src/controllers/adaptController';
import * as Transaction from '@src/controllers/transaction';
import * as Validator from '@src/middlewares/validators/transaction';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';

const transactionRoute = Router();
const authMiddleware = new AuthMiddleware();

transactionRoute.post(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.CreateTransactionValidator()),
    adaptController(new Transaction.CreateTransactionController())
);

transactionRoute.put(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.UpdateTransactionValidator()),
    adaptController(new Transaction.UpdateTransactionController())
);

transactionRoute.get(
    '/',
    adaptMiddleware(authMiddleware),
    adaptController(new Transaction.ListTransactionsController())
);

transactionRoute.get(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.ShowTransactionValidator()),
    adaptController(new Transaction.ShowTransactionController())
);

transactionRoute.delete(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptController(new Transaction.DeleteTransactionController())
);

export { transactionRoute };

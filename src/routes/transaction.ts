import { adaptController } from '@src/controllers/adaptController';
import * as Transaction from '@src/controllers/transaction';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateTransactionValidator } from '@src/middlewares/validators/transaction/createTransactionValidator';
import { UpdateTransactionValidator } from '@src/middlewares/validators/transaction/updateTransactionValidator';
import { ShowTransactionValidator } from '@src/middlewares/validators/transaction/showTransactionValidator';
import { Router } from 'express';

const transactionRoute = Router();
const authMiddleware = new AuthMiddleware();

transactionRoute.post(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new CreateTransactionValidator()),
    adaptController(new Transaction.CreateTransactionController())
);

transactionRoute.put(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new UpdateTransactionValidator()),
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
    adaptMiddleware(new ShowTransactionValidator()),
    adaptController(new Transaction.ShowTransactionController())
);

transactionRoute.delete(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptController(new Transaction.DeleteTransactionController())
);

export { transactionRoute };

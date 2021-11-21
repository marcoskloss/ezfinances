import { adaptController } from '@src/controllers/adaptController';
import { CreateTransactionController } from '@src/controllers/transaction/createTransaction';
import { DeleteTransactionController } from '@src/controllers/transaction/deleteTransaction';
import { ListTransactionsController } from '@src/controllers/transaction/listTransactions';
import { ShowTransactionController } from '@src/controllers/transaction/showTransaction';
import { UpdateTransactionController } from '@src/controllers/transaction/updateTransaction';
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
    adaptController(new CreateTransactionController())
);

transactionRoute.put(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new UpdateTransactionValidator()),
    adaptController(new UpdateTransactionController())
);

transactionRoute.get(
    '/',
    adaptMiddleware(authMiddleware),
    adaptController(new ListTransactionsController())
);

transactionRoute.get(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new ShowTransactionValidator()),
    adaptController(new ShowTransactionController())
);

transactionRoute.delete(
    '/:transactionId',
    adaptMiddleware(authMiddleware),
    adaptController(new DeleteTransactionController())
);

export { transactionRoute };

import { Transaction, TransactionModel } from '@src/models/transaction';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { Methods, doRequest } from '../../util/doRequest';

describe('PUT /transactions', () => {
    let user: UserModel;
    let transaction: TransactionModel;
    beforeAll(async () => {
        await Transaction.deleteMany({});

        user = new User({
            name: 'username',
            email: 'user@email.com',
            password: 123456,
        });
        await user.save();

        transaction = new Transaction({
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        });
        await transaction.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should update a transaction and return 200', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.put,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const transactionData = {
            title: 'new title',
        };

        const response = await doRequest(
            `/transactions/${transaction.id}`,
            { ...transactionData },
            options
        );
        const updatedTransaction = await Transaction.findOne({
            title: 'new title',
        });

        expect(updatedTransaction).toBeDefined();
        expect(response.status).toBe(200);
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = {
            method: Methods.put,
        };

        const transactionData = {
            title: 'newest title',
        };

        const response = await doRequest(
            `/transactions/${transaction.id}`,
            transactionData,
            options
        );
        expect(response.status).toBe(401);
    });

    it('should return 400 if the transaction to be updated doesnt exist', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.put,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const transactionData = {
            title: 'newest title',
        };
        const response = await doRequest(
            '/transactions/some_id',
            transactionData,
            options
        );
        expect(response.status).toBe(400);
    });
});

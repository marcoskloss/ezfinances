import { Transaction } from '@src/models/transaction';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { doRequest, Methods } from '../../util/doRequest';

describe('DELETE /transactions', () => {
    let user: UserModel;
    beforeAll(async () => {
        await Transaction.deleteMany({});

        user = new User({
            name: 'username',
            email: 'user@email.com',
            password: 123456,
        });
        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
    });
    afterEach(async () => {
        await Transaction.deleteMany({});
    });

    it('should delete the transaction and return 200', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.delete,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const data = await new Transaction({
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        }).save();
        const transaction = data.toJSON();

        const response = await doRequest(
            `/transactions/${transaction.id}`,
            {},
            options
        );

        expect(response.status).toBe(200);
        await expect(Transaction.findById(transaction.id)).resolves.toBeFalsy();
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = {
            method: Methods.delete,
        };

        const response = await doRequest('/transactions/some_id', {}, options);
        expect(response.status).toBe(401);
    });
});

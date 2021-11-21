import { UserModel, User } from '@src/models/user';
import { Transaction } from '@src/models/transaction';
import { AuthService } from '@src/services/auth';
import { Methods, doRequest } from '../../util/doRequest';

describe('GET /transactions/:transactionId', () => {
    let user: UserModel;
    beforeAll(async () => {
        await Transaction.deleteMany({});

        user = new User({
            name: 'username',
            email: 'user@email.com',
            password: 123123,
        });
        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    afterEach(async () => {
        await Transaction.deleteMany({});
    });

    it('should return the transaction for a given id', async () => {
        const transactionModel = await new Transaction({
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        }).save();
        const transaction = transactionModel.toJSON();

        const token = AuthService.generateToken(user.id);
        const options = {
            method: Methods.get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const response = await doRequest(
            `/transactions/${transaction.id}`,
            {},
            options
        );
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject(
            expect.objectContaining({
                title: 'my new transaction',
            })
        );
    });

    it('should return 400 if the given id is invalid objectId', async () => {
        const token = AuthService.generateToken(user.id);
        const options = {
            method: Methods.get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const response = await doRequest('/transactions/fake-id', {}, options);
        expect(response.status).toBe(400);
    });

    it('should return 401 if no authorization token is provided', async () => {
        const options = { method: Methods.get };

        const transactionModel = await new Transaction({
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        }).save();
        const transaction = transactionModel.toJSON();

        const response = await doRequest(
            `/transactions/${transaction.id}`,
            {},
            options
        );
        expect(response.status).toBe(401);
    });
});

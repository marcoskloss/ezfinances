import { Transaction } from '@src/models/transaction';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { doRequest, Methods } from '../../util/doRequest';

describe('POST /transactions', () => {
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

    it('should create a new transaction and return 201', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.post,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const transactionData = {
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        };

        const response = await doRequest(
            '/transactions',
            { ...transactionData },
            options
        );
        const transaction = await Transaction.findOne({
            title: 'my new transaction',
        });

        expect(response.status).toBe(201);
        expect(transaction).toBeDefined();
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = {
            method: Methods.post,
        };

        const transactionData = {
            amount: 100,
            title: 'my new transaction',
            date: new Date(),
            user: user.id,
        };

        const response = await doRequest(
            '/transactions',
            { ...transactionData },
            options
        );
        expect(response.status).toBe(401);
    });

    it('should return 422 if invalid body schema is provided', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.post,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const transactionData = {
            user: user.id,
        };

        const response = await doRequest(
            '/transactions',
            { ...transactionData },
            options
        );

        expect(response.status).toBe(422);
    });
});

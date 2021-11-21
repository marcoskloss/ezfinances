import { AuthService } from '@src/services/auth';
import { User, UserModel } from '@src/models/user';
import { Methods, doRequest } from '../../util/doRequest';
import { Transaction, TransactionModel } from '@src/models/transaction';

describe('GET /transactions', () => {
    let user: UserModel;

    function makeTransaction(title: string): TransactionModel {
        const model = new Transaction({
            amount: 100,
            title,
            date: new Date(),
            user: user.id,
        });
        return model;
    }

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

    it('should list all transactions of given a user', async () => {
        await makeTransaction('1st').save();
        await makeTransaction('2nd').save();
        await makeTransaction('3rd').save();

        const token = AuthService.generateToken(user.id);
        const options = {
            method: Methods.get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const response = await doRequest('/transactions', {}, options);
        expect(response.status).toBe(200);
        expect(response.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: '1st' }),
                expect.objectContaining({ title: '2nd' }),
                expect.objectContaining({ title: '3rd' }),
            ])
        );
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = { method: Methods.get };
        const response = await doRequest('/transactions', {}, options);
        expect(response.status).toBe(401);
    });
});

import { User } from '@src/models/user';
import { Methods, doRequest } from '../util/doRequest';

describe('/users/create', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('When creating a new user', () => {
        it('should create a new user with success and return 201', async () => {
            const options = {
                method: Methods.post,
            };

            const body = {
                name: 'username',
                password: '123456',
                email: 'username@mail.com',
            };

            const response = await doRequest('/users/create', body, options);

            const user = await User.findOne({ email: body.email });
            expect(response.status).toBe(201);
            expect(user).toBeTruthy();
        });
    });
});

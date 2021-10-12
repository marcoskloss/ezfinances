import { User } from '@src/models/user';
import { Methods, doRequest } from '../util/doRequest';

describe('/users/authenticate', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('When authenticating a user', () => {
        const userData = {
            name: 'username',
            password: '123456',
            email: 'username@mail.com',
        };

        it('given valid credentials it should generate a token', async () => {
            await new User(userData).save();
            const options = {
                method: Methods.post,
            };
            const body = {
                email: userData.email,
                password: userData.password,
            };

            const response = await doRequest(
                '/users/authenticate',
                body,
                options
            );

            expect(response).toEqual(
                expect.objectContaining({ token: expect.any(String) })
            );
        });
    });
});

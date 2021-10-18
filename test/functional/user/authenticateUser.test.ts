import { User } from '@src/models/user';
import { Methods, doRequest } from '../../util/doRequest';

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

        it('should return 403 if the user with the given email is not found', async () => {
            const options = {
                method: Methods.post,
            };
            const body = {
                email: 'some-email@mail.com',
                password: userData.password,
            };

            const response = await doRequest(
                '/users/authenticate',
                body,
                options
            );

            expect(response.status).toBe(403);
        });

        it('should return 403 if user is found but the password does not match', async () => {
            await new User(userData).save();
            const options = {
                method: Methods.post,
            };
            const body = {
                email: userData.email,
                password: 'invalid-password',
            };

            const response = await doRequest(
                '/users/authenticate',
                body,
                options
            );

            expect(response.status).toBe(403);
        });
    });
});

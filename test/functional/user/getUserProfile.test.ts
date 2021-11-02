import { User } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { Methods, doRequest } from '../../util/doRequest';

describe('/users/me', () => {
    const userData = {
        name: 'username',
        password: '123456',
        email: 'username@mail.com',
    };

    beforeEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => User.deleteMany({}));
    test("given a token it should return the token's owner information", async () => {
        const user = await new User({ ...userData }).save();
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.get,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await doRequest('/users/me', {}, options);

        expect(response.status).toBe(200);
        expect(response.name).toBe(user.name);
        expect(response.email).toBe(user.email);
        expect(response.id).toBe(user.id);
    });

    test('if authorization header is invalid it should return 401', async () => {
        await new User({ ...userData }).save();

        const options = {
            method: Methods.get,
            headers: {
                Authorization: `Bearer`,
            },
        };

        const response = await doRequest('/users/me', {}, options);

        expect(response.status).toBe(401);
    });

    test('if authorization header is not provided it should return 401', async () => {
        await new User({ ...userData }).save();

        const options = {
            method: Methods.get,
            headers: {},
        };

        const response = await doRequest('/users/me', {}, options);

        expect(response.status).toBe(401);
    });

    test('if authorization header is empty it should return 401', async () => {
        await new User({ ...userData }).save();

        const options = {
            method: Methods.get,
            headers: {
                authorization: '',
            },
        };

        const response = await doRequest('/users/me', {}, options);

        expect(response.status).toBe(401);
    });
});

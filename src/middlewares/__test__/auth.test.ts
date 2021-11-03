import { AppError } from '@src/errors/appError';
import { AuthService, TokenPayload } from '@src/services/auth';
import { log } from '@src/util/logger';
import { AuthMiddleware } from '../auth';

beforeAll(() => jest.spyOn(log, 'error').mockImplementation());
describe('AuthMiddleware', () => {
    const request: any = {
        headers: { authorization: 'Bearer ccess-token' },
    };

    test('if no access token is provided it should throw an authorization error', async () => {
        const authMiddleware = new AuthMiddleware();

        const req: any = {
            ...request,
            headers: { authorization: 'Bearer' },
        };

        await expect(authMiddleware.exec(req)).rejects.toThrow(AppError);
    });

    test('if no authorization header is provided it should throw an authorization error', async () => {
        const authMiddleware = new AuthMiddleware();

        const req: any = {
            ...request,
            headers: {},
        };

        await expect(authMiddleware.exec(req)).rejects.toThrow(AppError);
    });

    test('if invalid token is provided it should throw an authorization error', async () => {
        const authMiddleware = new AuthMiddleware();
        const req: any = {
            ...request,
            headers: { authorization: 'Bearer invalid-token' },
        };

        jest.spyOn(AuthService, 'decodeToken').mockImplementationOnce(() => {
            throw Error();
        });

        await expect(authMiddleware.exec(req)).rejects.toThrow(AppError);
    });

    test('if authorizatoin header is empty it should throw an authorization error', async () => {
        const authMiddleware = new AuthMiddleware();

        const req: any = {
            ...request,
            headers: {
                authorization: '',
            },
        };

        await expect(authMiddleware.exec(req)).rejects.toThrow(AppError);
    });

    test('if valid token is provided it should not throw', async () => {
        const authMiddleware = new AuthMiddleware();

        const payload: TokenPayload = {
            sub: 'some-id',
        };

        jest.spyOn(AuthService, 'decodeToken').mockReturnValueOnce(payload);

        await expect(authMiddleware.exec(request)).resolves.toBeUndefined();
    });
});

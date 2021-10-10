import { CreateUserController } from '@src/controllers/user/createUser';
import { AuthService } from '@src/services/auth';
import { UserRepository } from '@src/repositories/user';
import { User, UserModel } from '@src/models/user';
import { InsertUserError } from '@src/errors/repositories/user/insertUserError';
import { log } from '@src/util/logger';

jest.mock('@src/models/user');
beforeAll(() => jest.spyOn(log, 'error').mockImplementation());

describe('CreateUserController', () => {
    const user = {
        id: 'user-id',
        name: 'username',
        email: 'user@mail.com',
        password: 'password',
    };

    const request: any = {
        body: {
            ...user,
        },
    };

    const mockedUserModel = User as jest.Mocked<typeof User>;

    const userRepository = new UserRepository(mockedUserModel);

    test('when creating a new user it should save with encrypted password and return 201', async () => {
        const createUserController = new CreateUserController(userRepository);

        mockedUserModel.findOne.mockResolvedValueOnce(null);

        const insertResponse = {
            toJSON: () => '',
        } as UserModel;

        const insertSpy = jest
            .spyOn(userRepository, 'insert')
            .mockResolvedValueOnce(insertResponse);

        const hashPasswordSpy = jest
            .spyOn(AuthService, 'hashPassword')
            .mockResolvedValueOnce('hash-password');

        const response = await createUserController.handle(request);

        const userData = {
            email: user.email,
            name: user.name,
            password: 'hash-password',
        };

        expect(hashPasswordSpy).toBeCalledWith(request.body.password);
        expect(insertSpy).toBeCalledWith(userData);
        expect(response.status).toBe(201);
    });

    test('when trying to save a duplicated user it should return 409', async () => {
        const createUserController = new CreateUserController(userRepository);

        mockedUserModel.findOne.mockResolvedValueOnce(user as any);

        const response = await createUserController.handle(request);
        expect(response.status).toBe(409);
    });

    test('when insert throw an unexpected error it should return 500', async () => {
        const createUserController = new CreateUserController(userRepository);

        jest.spyOn(userRepository, 'insert').mockRejectedValue(
            new Error('error')
        );
        mockedUserModel.findOne.mockResolvedValueOnce(null);

        const response = await createUserController.handle(request);
        expect(response.status).toBe(500);
    });

    test('when insert throw a custom error it should return error message and error status code', async () => {
        const createUserController = new CreateUserController(userRepository);
        jest.spyOn(userRepository, 'insert').mockRejectedValue(
            new InsertUserError('error-message', 409)
        );

        const response = await createUserController.handle(request);
        expect(response.status).toBe(409);
        expect(response.error).toBe('error-message');
    });

    test('when insert return undefined it should return 500', async () => {
        const createUserController = new CreateUserController(userRepository);
        jest.spyOn(userRepository, 'insert').mockResolvedValueOnce(undefined);

        const response = await createUserController.handle(request);
        expect(response.status).toBe(500);
    });
});

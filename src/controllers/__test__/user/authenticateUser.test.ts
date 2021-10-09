import { AuthenticateUserController } from '@src/controllers/user/authenticateUser';
import { User } from '@src/models/user';
import { UserRepository } from '@src/repositories/user';
import { AuthService } from '@src/services/auth';

jest.mock('@src/models/user');

describe('AuthenticateUserController', () => {
    const user = {
        id: 'user-id',
        name: 'username',
        email: 'user@mail.com',
        password: 'password',

        toJSON() {
            return this;
        },
    };

    const request: any = {
        body: {
            ...user,
        },
    };

    const mockedUserModel = User as jest.Mocked<typeof User>;

    test('given valid user credentials it should return 200 and the access token', async () => {
        mockedUserModel.findOne.mockResolvedValueOnce(user as any);

        const userRepository = new UserRepository(mockedUserModel);
        const authenticateUserController = new AuthenticateUserController(
            userRepository
        );

        jest.spyOn(AuthService, 'comparePassword').mockResolvedValue(true);

        const generateTokenSpy = jest
            .spyOn(AuthService, 'generateToken')
            .mockReturnValue('access-token');

        const response = await authenticateUserController.handle(request);

        expect(userRepository.model.findOne).toBeCalledWith({
            email: user.email,
        });
        expect(generateTokenSpy).toBeCalledWith(user);
        expect(response.status).toBe(200);
        expect(response.data.token).toBe('access-token');
    });

    describe('given invalid credentials', () => {
        test('given invalid email it should return 403', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(null);

            const userRepository = new UserRepository(mockedUserModel);
            const authenticateUserController = new AuthenticateUserController(
                userRepository
            );

            const response = await authenticateUserController.handle(request);
            expect(response.status).toBe(403);
            expect(response.error).toBe('Email/Password inválido!');
        });

        test('given invalid password it should return 403', async () => {
            mockedUserModel.findOne.mockResolvedValueOnce(user as any);

            const userRepository = new UserRepository(mockedUserModel);
            const authenticateUserController = new AuthenticateUserController(
                userRepository
            );

            jest.spyOn(AuthService, 'comparePassword').mockResolvedValue(false);

            const response = await authenticateUserController.handle(request);
            expect(response.status).toBe(403);
            expect(response.error).toBe('Email/Password inválido!');
        });
    });

    test('when some unhandled error occurs it should return 500', async () => {
        mockedUserModel.findOne.mockRejectedValueOnce(
            new Error('unhandled error!')
        );

        const userRepository = new UserRepository(mockedUserModel);
        const authenticateUserController = new AuthenticateUserController(
            userRepository
        );

        const response = await authenticateUserController.handle(request);
        expect(response.status).toBe(500);
    });
});

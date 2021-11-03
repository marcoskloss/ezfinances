import { GetUserProfileController } from '@src/controllers/user/getUserProfile';
import { User } from '@src/models/user';
import { UserRepository } from '@src/repositories/user';

jest.mock('@src/models/user');
describe('GetUserProfileController', () => {
    const mockedUserModel = User as jest.Mocked<typeof User>;

    const request: any = {
        user_decoded: {
            id: '123',
        },
    };
    const userRepository = new UserRepository(mockedUserModel);

    test("should return token's owner information", async () => {
        const userData = {
            id: '123',
            email: 'email',
            name: 'username',
            toJSON() {
                return { email: this.email, name: this.name };
            },
        };

        mockedUserModel.findById.mockResolvedValueOnce(userData as any);

        const getUserProfileController = new GetUserProfileController(
            userRepository
        );

        const response = await getUserProfileController.handle(request);
        expect(response.data).toMatchObject({
            email: userData.email,
            name: userData.name,
        });
    });

    test('should throw when user is not found', async () => {
        mockedUserModel.findById.mockResolvedValueOnce(null);
        const getUserProfileController = new GetUserProfileController(
            userRepository
        );

        await expect(
            getUserProfileController.handle(request)
        ).rejects.toMatchObject({ code: 404 });
    });
});

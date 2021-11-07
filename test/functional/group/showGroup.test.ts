import { UserModel, User } from '@src/models/user';
import { Group } from '@src/models/group';
import { AuthService } from '@src/services/auth';
import { Methods, doRequest } from '../../util/doRequest';

describe('GET /groups/:groupId', () => {
    let user: UserModel;
    beforeAll(async () => {
        await Group.deleteMany({});

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
        await Group.deleteMany({});
    });

    it('should return the group for a given id', async () => {
        const groupModel = await new Group({
            title: 'My Group',
            user: user.id,
        }).save();
        const group = groupModel.toJSON();

        const token = AuthService.generateToken(user.id);
        const options = {
            method: Methods.get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const response = await doRequest(`/groups/${group.id}`, {}, options);
        expect(response.status).toBe(200);
        expect(response.data).toMatchObject(
            expect.objectContaining({
                title: 'My Group',
            })
        );
    });

    it.todo('should return 400 if the given id is invalid objectId');
    it.todo('should return 401 if no authorization token is provided');
});

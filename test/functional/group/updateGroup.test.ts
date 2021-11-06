import { Group, GroupModel } from '@src/models/group';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { Methods, doRequest } from '../../util/doRequest';

describe('PUT /groups', () => {
    let user: UserModel;
    let group: GroupModel;
    beforeAll(async () => {
        await Group.deleteMany({});

        user = new User({
            name: 'username',
            email: 'user@email.com',
            password: 123456,
        });
        await user.save();

        group = new Group({
            active: true,
            title: 'My New Group',
            user: user.id,
        });
        await group.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('should update a group and return 200', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.put,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const groupData = {
            id: group.id,
            title: 'new title',
        };

        const response = await doRequest('/groups', { ...groupData }, options);
        const updatedGroup = await Group.findOne({ title: 'new title' });

        expect(updatedGroup).toBeDefined();
        expect(response.status).toBe(200);
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = {
            method: Methods.put,
        };

        const groupData = {
            id: group.id,
            title: 'newest title',
        };

        const response = await doRequest('/groups', groupData, options);
        expect(response.status).toBe(401);
    });
});

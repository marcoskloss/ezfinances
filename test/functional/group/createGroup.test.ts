import { Group, GroupData } from '@src/models/group';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { doRequest, Methods } from '../../util/doRequest';

describe('POST /groups', () => {
    let user: UserModel;
    beforeAll(async () => {
        await Group.deleteMany({});

        user = new User({
            name: 'username',
            email: 'user@email.com',
            password: 123456,
        });
        await user.save();
    });

    afterAll(async () => {
        await User.deleteMany({});
    });
    afterEach(async () => {
        await Group.deleteMany({});
    });

    it('should create a new group and return 201', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.post,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const groupData: GroupData = {
            active: true,
            title: 'My New Group',
            user: user.id,
        };

        const response = await doRequest('/groups', { ...groupData }, options);
        const group = await Group.findOne({ title: 'My New Group' });

        expect(response.status).toBe(201);
        expect(group).toBeDefined();
    });

    it.todo('should return 401 if authorization token is not provided');
    it.todo('should return 422 if invalid body schema is provided');
});

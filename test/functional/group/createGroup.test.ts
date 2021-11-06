import { Group, GroupData } from '@src/models/group';
import { User, UserModel } from '@src/models/user';
import { doRequest, Methods } from '../../util/doRequest';

describe('POST /groups', () => {
    let user: UserModel;
    beforeAll(async () => {
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
        const options = {
            method: Methods.post,
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
});

import { Group } from '@src/models/group';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { doRequest, Methods } from '../../util/doRequest';

describe('DELETE /groups', () => {
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

    it('should delete the group and return 200', async () => {
        const token = AuthService.generateToken(user.id);

        const options = {
            method: Methods.delete,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const data = await new Group({
            active: true,
            title: 'My New Group',
            user: user.id,
        }).save();
        const group = data.toJSON();

        const response = await doRequest(`/groups/${group.id}`, {}, options);

        expect(response.status).toBe(200);
        await expect(Group.findById(group.id)).resolves.toBeFalsy();
    });
});

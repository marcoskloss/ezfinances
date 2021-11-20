import { Group } from '@src/models/group';
import { User, UserModel } from '@src/models/user';
import { AuthService } from '@src/services/auth';
import { Transaction } from '@src/models/transaction';
import { doRequest, Methods } from '../../util/doRequest';

describe('DELETE /groups', () => {
    let user: UserModel;
    beforeAll(async () => {
        await Group.deleteMany({});
        await Transaction.deleteMany({});

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
        await Transaction.deleteMany({});
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

    it('should not delete the group and return 400', async () => {
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

        await new Transaction({
            amount: 1,
            title: 'foo',
            user: user.id,
            group: group.id,
            date: new Date(),
        }).save();

        const response = await doRequest(`/groups/${group.id}`, {}, options);

        expect(response.status).toBe(400);
        await expect(Group.findById(group.id)).resolves.toBeTruthy();
    });

    it('should return 401 if authorization token is not provided', async () => {
        const options = {
            method: Methods.delete,
        };

        const response = await doRequest('/groups/some_id', {}, options);
        expect(response.status).toBe(401);
    });
});

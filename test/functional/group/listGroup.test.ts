import { AuthService } from '@src/services/auth';
import { User, UserModel } from '@src/models/user';
import { Methods, doRequest } from '../../util/doRequest';
import { Group } from '@src/models/group';

describe('GET /groups', () => {
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

    it('should list all groups of given a user', async () => {
        await new Group({ title: 'My Group', user: user.id }).save();
        await new Group({ title: 'Your Group', user: user.id }).save();
        await new Group({ title: 'Our Group', user: user.id }).save();

        const token = AuthService.generateToken(user.id);
        const options = {
            method: Methods.get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const response = await doRequest('/groups', {}, options);
        expect(response.status).toBe(200);
        expect(response.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: 'My Group' }),
                expect.objectContaining({ title: 'Our Group' }),
                expect.objectContaining({ title: 'Your Group' }),
            ])
        );
    });
});

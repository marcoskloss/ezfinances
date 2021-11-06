import { Group } from '@src/models/group';
import { UpdateGroupValidator } from '../group/updateGroupValidator';

jest.mock('@src/models/group');

describe('upateGroupValidator', () => {
    it('should throw if group doesnt exist', async () => {
        const mockedGroup = Group as jest.Mocked<typeof Group>;
        mockedGroup.findOne.mockResolvedValueOnce(null);

        const req: any = {
            body: {},
        };

        const updateGroupValidator = new UpdateGroupValidator();
        await expect(updateGroupValidator.exec(req)).rejects.toThrowError(
            'Grupo não encontrado!'
        );
    });
});

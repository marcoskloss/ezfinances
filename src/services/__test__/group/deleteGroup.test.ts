import { Transaction } from '@src/models/transaction';
import { Group } from '@src/models/group';
import { DeleteGroupService } from '@src/services/group/deleteGroup';

jest.mock('@src/models/transaction');
jest.mock('@src/models/group');

describe('deleteGroupService', () => {
    const mockedTransaction = Transaction as jest.Mocked<typeof Transaction>;
    const mockedGroup = Group as jest.Mocked<typeof Group>;

    it('should delete the group if it hasnt a transaction associated', async () => {
        mockedTransaction.count.mockResolvedValueOnce(0);

        const deleteGroupService = new DeleteGroupService();
        const id = await deleteGroupService.exec({ groupId: 'some_id' });

        expect(id).toBe('some_id');
        expect(mockedGroup.deleteOne).toHaveBeenCalled();
    });

    it('should not delete the group if it has a transaction associated', async () => {
        mockedTransaction.count.mockResolvedValueOnce(1);

        const deleteGroupService = new DeleteGroupService();
        await expect(
            deleteGroupService.exec({ groupId: 'some_id' })
        ).rejects.toThrow(
            'Não é possível deletar um grupo que tenha transações associadas!'
        );
    });
});

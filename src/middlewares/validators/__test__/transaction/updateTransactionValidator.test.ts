import { Transaction } from '@src/models/transaction';
import { UpdateTransactionValidator } from '@src/middlewares/validators/transaction/updateTransactionValidator';

jest.mock('@src/models/transaction');

describe('UpdateTransactionValidator', () => {
    it('should throw if transaction doesnt exist', async () => {
        const mockedTransaction = Transaction as jest.Mocked<
            typeof Transaction
        >;
        mockedTransaction.findOne.mockResolvedValueOnce(null);

        const req: any = {
            params: { transactionId: 'foo' },
        };

        const updateTransactionValidator = new UpdateTransactionValidator();
        await expect(
            updateTransactionValidator.exec(req)
        ).rejects.toThrowError();
    });
});

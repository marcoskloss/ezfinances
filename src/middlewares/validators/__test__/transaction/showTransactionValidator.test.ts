import { ShowTransactionValidator } from '@src/middlewares/validators/transaction/showTransactionValidator';
import { Types } from 'mongoose';

describe('showTransactionValidator', () => {
    it('should throw if the given id is a invalid objectId', () => {
        const req: any = { params: { transactionId: 'invalidId' } };

        const showTransactionValidator = new ShowTransactionValidator();
        expect(() => showTransactionValidator.exec(req)).toThrowError();
    });

    it('should not throw if the given id is a valid objectId', () => {
        const req: any = { params: { transactionId: new Types.ObjectId() } };

        const showTransactionValidator = new ShowTransactionValidator();
        expect(showTransactionValidator.exec(req)).toBeUndefined();
    });
});

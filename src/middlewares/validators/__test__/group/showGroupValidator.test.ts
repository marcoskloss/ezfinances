import { ShowGroupValidator } from '@src/middlewares/validators/group/showGroupValidator';
import { Types } from 'mongoose';

describe('showGroupValidator', () => {
    it('should throw if the given id is a invalid objectId', () => {
        const req: any = { params: { groupId: 'invalidId' } };

        const showGroupValidator = new ShowGroupValidator();
        expect(() => showGroupValidator.exec(req)).toThrowError(
            'Grupo não encontrado!'
        );
    });

    it('should not throw if the given id is a valid objectId', () => {
        const req: any = { params: { groupId: new Types.ObjectId() } };

        const showGroupValidator = new ShowGroupValidator();
        expect(showGroupValidator.exec(req)).toBeUndefined();
    });
});

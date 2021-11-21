import { CreateGroupValidator } from '@src/middlewares/validators/group/createGroupValidator';

describe('createGroupValidator', () => {
    it('should throw if title is not provided', async () => {
        const req: any = { body: {} };

        const createGroupValidator = new CreateGroupValidator();
        await expect(createGroupValidator.exec(req)).rejects.toThrowError(
            'Título não informado!'
        );
    });

    it('should not throw if title is provided', async () => {
        const req: any = {
            body: {
                title: 'My New Group',
            },
        };

        const createGroupValidator = new CreateGroupValidator();
        await expect(createGroupValidator.exec(req)).resolves.toBeUndefined();
    });
});

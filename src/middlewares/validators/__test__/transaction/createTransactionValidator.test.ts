import { CreateTransactionValidator } from '@src/middlewares/validators/transaction/createTransactionValidator';

describe('createTransactionValidator', () => {
    it('should throw if amount is not provided', async () => {
        const req: any = {
            body: {
                title: 'foo',
                date: new Date(),
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).rejects.toBeDefined();
    });

    it('should throw if title is not provided', async () => {
        const req: any = {
            body: {
                amount: 20,
                date: new Date(),
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).rejects.toBeDefined();
    });

    it('should throw if title has more than 30 chars', async () => {
        const req: any = {
            body: {
                title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                amount: 20,
                date: new Date(),
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).rejects.toBeDefined();
    });

    it('should throw if description has more than 40 chars', async () => {
        const req: any = {
            body: {
                title: 'foo',
                description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                amount: 20,
                date: new Date(),
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).rejects.toBeDefined();
    });

    it('should throw if date is not provided', async () => {
        const req: any = {
            body: {
                title: 'foo',
                amount: 20,
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).rejects.toBeDefined();
    });

    it('should not throw if all data is provided', async () => {
        const req: any = {
            body: {
                amount: 20,
                title: 'foo',
                date: new Date(),
            },
        };

        const createTransactionValidator = new CreateTransactionValidator();
        await expect(
            createTransactionValidator.exec(req)
        ).resolves.toBeUndefined();
    });
});

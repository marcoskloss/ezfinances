import { CreateUserValidator } from '../user/createUserValidator';

describe('createUserValidator', () => {
    const body = {
        password: '123456',
        name: 'username',
        email: 'username@mail.com',
    };

    describe('createUserValidator should throw if:', () => {
        it('name is not provided', async () => {
            const req: any = {
                body: {
                    ...body,
                    name: undefined,
                },
            };

            const createUserValidator = new CreateUserValidator();
            await expect(createUserValidator.exec(req)).rejects.toThrowError(
                'Nome não informado!'
            );
        });

        it('password is not provided', async () => {
            const req: any = {
                body: {
                    ...body,
                    password: undefined,
                },
            };

            const createUserValidator = new CreateUserValidator();
            await expect(createUserValidator.exec(req)).rejects.toThrowError(
                'Senha não informada!'
            );
        });

        it('email is not provided', async () => {
            const req: any = {
                body: {
                    ...body,
                    email: undefined,
                },
            };

            const createUserValidator = new CreateUserValidator();
            await expect(createUserValidator.exec(req)).rejects.toThrowError(
                'Email não informado!'
            );
        });

        it('email is invalid', async () => {
            const req: any = {
                body: {
                    ...body,
                    email: 'usename#mail.com',
                },
            };

            const createUserValidator = new CreateUserValidator();
            await expect(createUserValidator.exec(req)).rejects.toThrowError(
                'Email inválido!'
            );
        });
    });

    it('createUserValidator should not throw if email, password and name are provided and valid', async () => {
        const req: any = {
            body,
        };

        const createUserValidator = new CreateUserValidator();
        await expect(createUserValidator.exec(req)).resolves.toBeUndefined();
    });
});

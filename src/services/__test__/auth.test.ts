import bcrypt from 'bcrypt';
import { AuthService } from '../auth';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
    test('hashPassword', async () => {
        const hashSpy = jest.spyOn(bcrypt, 'hash');

        const password = 'pass';

        expect(AuthService.hashPassword(password, 9)).resolves.toBeDefined();
        expect(hashSpy).toBeCalledWith(password, 9);
    });

    describe('comparePassword', () => {
        test('given the right password it should return true', async () => {
            const compareSpy = jest.spyOn(bcrypt, 'compare');

            const password = 'pass';
            const hashedPassword = await bcrypt.hash(password, 8);

            expect(
                AuthService.comparePassword(password, hashedPassword)
            ).resolves.toBeTruthy();
            expect(compareSpy).toBeCalledWith(password, hashedPassword);
        });

        test('given the wrong password it should return false', async () => {
            const compareSpy = jest.spyOn(bcrypt, 'compare');

            const password = 'pass';
            const hashedPassword = 'hash';

            expect(
                AuthService.comparePassword(password, hashedPassword)
            ).resolves.toBeFalsy();
            expect(compareSpy).toBeCalledWith(password, hashedPassword);
        });
    });

    test('generateToken', () => {
        const signSpy = jest.spyOn(jwt, 'sign');

        const user = {
            email: 'user@mail.com',
            name: 'username',
            id: 'user-id',
        };

        AuthService.generateToken(user);
        expect(signSpy).toHaveBeenCalledWith({ ...user }, 'very-secret-key', {
            subject: user.id,
            expiresIn: '1d',
        });
    });
});

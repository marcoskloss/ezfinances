import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export type TokenPayload = {
    sub: string;
};

export class AuthService {
    public static async hashPassword(
        password: string,
        salt = 8
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public static async comparePassword(
        password: string,
        hashedPassowrd: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassowrd);
    }

    public static generateToken(id: string): string {
        return jwt.sign({ sub: id }, process.env.AUTH_KEY, {
            expiresIn: '1d',
        });
    }

    public static decodeToken(token: string): TokenPayload {
        return jwt.verify(token, process.env.AUTH_KEY) as TokenPayload;
    }
}

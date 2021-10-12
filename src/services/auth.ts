import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export type TokenPayload = {
    id: string;
    email: string;
    name: string;
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

    public static generateToken(user: Record<string, any>): string {
        return jwt.sign(
            { email: user.email, name: user.name, id: user.id },
            process.env.AUTH_KEY,
            {
                subject: String(user.id),
                expiresIn: '1d',
            }
        );
    }

    public static decodeToken(token: string): TokenPayload {
        return jwt.verify(token, process.env.AUTH_KEY) as TokenPayload;
    }
}

import { AppError } from '@src/errors/appError';
import { AuthService } from '@src/services/auth';
import { Request } from '@src/util/http';
import { log } from '@src/util/logger';
import { Middleware } from './contract';

export class AuthMiddleware implements Middleware {
    async exec(req: Request): Promise<void> {
        const authHeader = req.headers?.['authorization'];

        if (!authHeader) {
            throw new AppError('Sem autorização!', 401);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new AppError('Sem autorização!', 401);
        }

        try {
            const decodedToken = AuthService.decodeToken(token);

            req.userId = decodedToken.sub;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            log.error(error);
            throw new AppError('Token informado inválido!', 401);
        }
    }
}

import { CustomError } from '@src/errors/customError';
import { AuthorizationError } from '@src/errors/middlewares/authorizationError';
import { AuthService } from '@src/services/auth';
import { Request } from '@src/util/http';
import { log } from '@src/util/logger';
import { Middleware } from './contract';

export class AuthMiddleware implements Middleware {
    async exec(req: Request): Promise<void> {
        const authHeader = req.headers?.['authorization'];

        if (!authHeader) {
            throw new AuthorizationError('Sem autorização!');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new AuthorizationError('Sem autorização!');
        }

        try {
            const decodedToken = AuthService.decodeToken(token);

            req.userId = decodedToken.sub;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            log.error(error);
            throw new AuthorizationError('Token informado inválido!');
        }
    }
}

import * as yup from 'yup';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { AppError } from '@src/errors/appError';
import { log } from '@src/util/logger';
import { InternalError } from '@src/errors/internalError';

export class CreateGroupValidator implements Middleware {
    async exec(req: Request): Promise<void> {
        try {
            const schema = yup.object().shape({
                title: yup.string().required('Título não informado!'),
            });

            await schema.validate(req.body);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                throw new AppError(error.message, 422);
            }

            log.error(error);
            throw new InternalError();
        }
    }
}

import * as yup from 'yup';
import { Request } from '@src/util/http';
import { Middleware } from '@src/middlewares/contract';
import { AppError } from '@src/errors/appError';
import { log } from '@src/util/logger';
import { InternalError } from '@src/errors/internalError';

export class CreateUserValidator implements Middleware {
    async exec(req: Request): Promise<void> {
        try {
            const schema = yup.object().shape({
                email: yup
                    .string()
                    .email('Email inválido!')
                    .required('Email não informado!'),
                name: yup.string().required('Nome não informado!'),
                password: yup.string().required('Senha não informada!'),
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

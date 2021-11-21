import * as yup from 'yup';
import { Middleware } from '@src/middlewares/contract';
import { Request } from '@src/util/http';
import { InternalError } from '@src/errors/internalError';
import { log } from '@src/util/logger';
import { AppError } from '@src/errors/appError';

export class CreateTransactionValidator implements Middleware {
    async exec(req: Request): Promise<void> {
        try {
            const schema = yup.object().shape({
                amount: yup.number().required('Quantiade não informada!'),
                title: yup
                    .string()
                    .max(30, 'O Título deve ter no máximo 30 caracteres!')
                    .required('Título não informado!'),
                description: yup
                    .string()
                    .nullable()
                    .max(40, 'A Descrição deve ter no máximo 40 caracteres!'),
                date: yup.date().required('Data não informada!'),
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

import { AppError } from '@src/errors/appError';
import { InternalError } from '@src/errors/internalError';
import { UserData } from '@src/models/user';
import { UserRepository } from '@src/repositories/user';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';
import { handleCustomError } from '../handleCustomError';

export class CreateUserController implements Controller {
    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}

    async handle(req: Request<UserData>): Promise<Response> {
        try {
            const { email, name, password } = req.body;

            const userAlreadyExists = await this.userRepository.model.findOne({
                email,
            });

            if (userAlreadyExists) {
                throw new AppError('Usuário já cadastrado!', 409);
            }

            const user = await this.userRepository.insert({
                email,
                name,
                password,
            });

            if (!user) {
                throw new InternalError();
            }

            return {
                status: 201,
                data: user.toJSON(),
            };
        } catch (error) {
            return handleCustomError(error);
        }
    }
}

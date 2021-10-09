import { INTERNAL_ERROR_MESSAGE } from '@src/errors/internalError';
import { UserData } from '@src/models/user';
import { UserRepository } from '@src/repositories/user';
import { AuthService } from '@src/services/auth';
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
                return {
                    error: 'Usuário já cadastrado!',
                    status: 409,
                };
            }

            const hashedPassword = await AuthService.hashPassword(password);
            const user = await this.userRepository.insert({
                email,
                name,
                password: hashedPassword,
            });

            if (!user) {
                return {
                    error: INTERNAL_ERROR_MESSAGE,
                    status: 500,
                };
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

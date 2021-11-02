import { UserRepository } from '@src/repositories/user';
import { Request, Response } from '@src/util/http';
import { Controller } from '@src/controllers/contract';
import { AppError } from '@src/errors/appError';

export class GetUserProfileController implements Controller {
    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}

    async handle(req: Request): Promise<Response> {
        const id = req.userId;
        const user = await this.userRepository.model.findById(id, '-password');

        if (!user) {
            throw new AppError('Usuário não encontrado!', 404);
        }

        return {
            data: user.toJSON(),
        };
    }
}

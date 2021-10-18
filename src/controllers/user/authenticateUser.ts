import { AuthenticateUserError } from '@src/errors/repositories/user/authenticateUserError';
import { UserRepository } from '@src/repositories/user';
import { AuthService } from '@src/services/auth';
import { Request, Response } from '@src/util/http';
import { Controller } from '../contract';

type AuthenticateUserParams = {
    password: string;
    email: string;
};

export class AuthenticateUserController implements Controller {
    constructor(
        private userRepository: UserRepository = new UserRepository()
    ) {}

    async handle(req: Request<AuthenticateUserParams>): Promise<Response> {
        const { email, password } = req.body;

        const user = await this.userRepository.model.findOne({ email });

        if (!user) {
            throw new AuthenticateUserError('Email/Password inválido!', 403);
        }

        const passwordMatch = await AuthService.comparePassword(
            password,
            user.password
        );
        if (!passwordMatch) {
            throw new AuthenticateUserError('Email/Password inválido!', 403);
        }

        const token = AuthService.generateToken(user.toJSON());

        return { status: 200, data: { token, user } };
    }
}

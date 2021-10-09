import { Router } from 'express';
import { CreateUserController } from '@src/controllers/user/createUser';
import { AuthenticateUserController } from '@src/controllers/user/authenticateUser';
import { adaptController } from '@src/controllers/adaptController';

const userRoute = Router();

userRoute.post('/create', adaptController(new CreateUserController()));
userRoute.post(
    '/authenticate',
    adaptController(new AuthenticateUserController())
);

export { userRoute };

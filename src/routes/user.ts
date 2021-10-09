import { Router } from 'express';
import { CreateUserController } from '@src/controllers/user/createUser';
import { AuthenticateUserController } from '@src/controllers/user/authenticateUser';
import { adaptController } from '@src/controllers/adaptController';

const userRouter = Router();

userRouter.post('/create', adaptController(new CreateUserController()));
userRouter.post(
    '/authenticate',
    adaptController(new AuthenticateUserController())
);

export { userRouter };

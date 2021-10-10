import { Router } from 'express';
import { CreateUserController } from '@src/controllers/user/createUser';
import { AuthenticateUserController } from '@src/controllers/user/authenticateUser';
import { adaptController } from '@src/controllers/adaptController';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateUserValidator } from '@src/middlewares/validators/user/createUserValidator';

const userRoute = Router();

userRoute.post(
    '/create',
    adaptMiddleware(new CreateUserValidator()),
    adaptController(new CreateUserController())
);
userRoute.post(
    '/authenticate',
    adaptMiddleware(new AuthMiddleware()),
    adaptController(new AuthenticateUserController())
);

export { userRoute };

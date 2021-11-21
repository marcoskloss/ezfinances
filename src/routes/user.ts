import { Router } from 'express';
import * as User from '@src/controllers/user';
import { adaptController } from '@src/controllers/adaptController';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { CreateUserValidator } from '@src/middlewares/validators/user/createUserValidator';
import { AuthMiddleware } from '@src/middlewares/auth';

const userRoute = Router();

userRoute.post(
    '/create',
    adaptMiddleware(new CreateUserValidator()),
    adaptController(new User.CreateUserController())
);
userRoute.post(
    '/authenticate',
    adaptController(new User.AuthenticateUserController())
);

userRoute.get(
    '/me',
    adaptMiddleware(new AuthMiddleware()),
    adaptController(new User.GetUserProfileController())
);

export { userRoute };

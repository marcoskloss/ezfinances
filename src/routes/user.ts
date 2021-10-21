import { Router } from 'express';
import { CreateUserController } from '@src/controllers/user/createUser';
import { AuthenticateUserController } from '@src/controllers/user/authenticateUser';
import { adaptController } from '@src/controllers/adaptController';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { CreateUserValidator } from '@src/middlewares/validators/user/createUserValidator';
import { AuthMiddleware } from '@src/middlewares/auth';
import { GetUserProfileController } from '@src/controllers/user/getUserProfile';

const userRoute = Router();

userRoute.post(
    '/create',
    adaptMiddleware(new CreateUserValidator()),
    adaptController(new CreateUserController())
);
userRoute.post(
    '/authenticate',
    adaptController(new AuthenticateUserController())
);

userRoute.get(
    '/me',
    adaptMiddleware(new AuthMiddleware()),
    adaptController(new GetUserProfileController())
);

export { userRoute };

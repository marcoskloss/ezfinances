import { adaptController } from '@src/controllers/adaptController';
import { CreateGroupController } from '@src/controllers/group/createGroup';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateGroupValidator } from '@src/middlewares/validators/group/createGroupValidator';
import { Router } from 'express';

const groupRoute = Router();

groupRoute.post(
    '/',
    adaptMiddleware(new AuthMiddleware()),
    adaptMiddleware(new CreateGroupValidator()),
    adaptController(new CreateGroupController())
);

export { groupRoute };

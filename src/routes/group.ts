import { adaptController } from '@src/controllers/adaptController';
import { CreateGroupController } from '@src/controllers/group/createGroup';
import { UpdateGroupController } from '@src/controllers/group/updateGroup';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateGroupValidator } from '@src/middlewares/validators/group/createGroupValidator';
import { UpdateGroupValidator } from '@src/middlewares/validators/group/updateGroupValidator';
import { Router } from 'express';

const groupRoute = Router();

groupRoute.post(
    '/',
    adaptMiddleware(new AuthMiddleware()),
    adaptMiddleware(new CreateGroupValidator()),
    adaptController(new CreateGroupController())
);

groupRoute.put(
    '/',
    adaptMiddleware(new AuthMiddleware()),
    adaptMiddleware(new UpdateGroupValidator()),
    adaptController(new UpdateGroupController())
);

export { groupRoute };

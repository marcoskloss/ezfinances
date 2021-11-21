import { Router } from 'express';
import { adaptController } from '@src/controllers/adaptController';
import * as Group from '@src/controllers/group';
import * as Validator from '@src/middlewares/validators/group';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';

const groupRoute = Router();
const authMiddleware = new AuthMiddleware();

groupRoute.post(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.CreateGroupValidator()),
    adaptController(new Group.CreateGroupController())
);

groupRoute.put(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.UpdateGroupValidator()),
    adaptController(new Group.UpdateGroupController())
);

groupRoute.get(
    '/',
    adaptMiddleware(authMiddleware),
    adaptController(new Group.ListGroupsController())
);

groupRoute.get(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new Validator.ShowGroupValidator()),
    adaptController(new Group.ShowGroupController())
);

groupRoute.delete(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptController(new Group.DeleteGroupController())
);

export { groupRoute };

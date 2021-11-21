import { Router } from 'express';
import { adaptController } from '@src/controllers/adaptController';
import * as Group from '@src/controllers/group';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateGroupValidator } from '@src/middlewares/validators/group/createGroupValidator';
import { UpdateGroupValidator } from '@src/middlewares/validators/group/updateGroupValidator';
import { ShowGroupValidator } from '@src/middlewares/validators/group/showGroupValidator';

const groupRoute = Router();
const authMiddleware = new AuthMiddleware();

groupRoute.post(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new CreateGroupValidator()),
    adaptController(new Group.CreateGroupController())
);

groupRoute.put(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new UpdateGroupValidator()),
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
    adaptMiddleware(new ShowGroupValidator()),
    adaptController(new Group.ShowGroupController())
);

groupRoute.delete(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptController(new Group.DeleteGroupController())
);

export { groupRoute };

import { Router } from 'express';
import { adaptController } from '@src/controllers/adaptController';
import { CreateGroupController } from '@src/controllers/group/createGroup';
import { UpdateGroupController } from '@src/controllers/group/updateGroup';
import { adaptMiddleware } from '@src/middlewares/adaptMiddleware';
import { AuthMiddleware } from '@src/middlewares/auth';
import { CreateGroupValidator } from '@src/middlewares/validators/group/createGroupValidator';
import { UpdateGroupValidator } from '@src/middlewares/validators/group/updateGroupValidator';
import { ListGroupsController } from '@src/controllers/group/listGroup';
import { ShowGroupValidator } from '@src/middlewares/validators/group/showGroupValidator';
import { ShowGroupController } from '@src/controllers/group/showGroup';
import { DeleteGroupController } from '@src/controllers/group/deleteGroup';

const groupRoute = Router();
const authMiddleware = new AuthMiddleware();

groupRoute.post(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new CreateGroupValidator()),
    adaptController(new CreateGroupController())
);

groupRoute.put(
    '/',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new UpdateGroupValidator()),
    adaptController(new UpdateGroupController())
);

groupRoute.get(
    '/',
    adaptMiddleware(authMiddleware),
    adaptController(new ListGroupsController())
);

groupRoute.get(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptMiddleware(new ShowGroupValidator()),
    adaptController(new ShowGroupController())
);

groupRoute.delete(
    '/:groupId',
    adaptMiddleware(authMiddleware),
    adaptController(new DeleteGroupController())
);

export { groupRoute };

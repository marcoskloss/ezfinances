import { Router } from 'express';
import { groupRoute } from './group';
import { userRoute } from './user';

const route = Router();

route.use('/users', userRoute);
route.use('/groups', groupRoute);

export { route as routes };

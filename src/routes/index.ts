import { Router } from 'express';
import { groupRoute } from './group';
import { transactionRoute } from './transaction';
import { userRoute } from './user';

const route = Router();

route.use('/users', userRoute);
route.use('/groups', groupRoute);
route.use('/transactions', transactionRoute);

export { route as routes };

import { Router } from 'express';
import questionRouter from './question.routes';
import authRouter from './auth.routes';
const routes = Router();
// define the base path and the router that's going to be called
routes.use('/questions', questionRouter);
routes.use('/auth', authRouter);
// export the route
export default routes;
import { Router } from 'express';
import questionController from '../controllers/question.controller';
const questionRouter = Router();
// specifies the endpoint and the method to call
questionRouter.get('/', questionController.getAll);
// export the router
export default questionRouter;
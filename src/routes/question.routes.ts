import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';
const questionRouter = Router();
let questionController: QuestionController = new QuestionController();
// specifies the endpoint and the method to call
questionRouter.get( '/', questionController.getAll );
// export the router
export default questionRouter;
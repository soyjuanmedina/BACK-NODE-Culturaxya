import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';
const questionRouter = Router();
let questionController: QuestionController = new QuestionController();
// specifies the endpoint and the method to call
questionRouter.get( '/', questionController.getAll );
questionRouter.post( '/', questionController.propose );
// export the router
export default questionRouter;
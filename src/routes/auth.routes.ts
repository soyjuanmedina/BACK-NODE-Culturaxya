import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const authRouter = Router();
let authController: AuthController = new AuthController();
// specifies the endpoint and the method to call
authRouter.post('/signup', authController.registerUser);
authRouter.post('/signin', authController.login);
// export the router
export default authRouter;
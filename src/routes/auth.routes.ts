import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
const authRouter = Router();
let authController: AuthController = new AuthController();
// specifies the endpoint and the method to call
authRouter.post( '/signup', authController.registerUser );
authRouter.post( '/signin', authController.login );
authRouter.post( '/user/confirm-email', authController.confirmEmail );
authRouter.post( '/resend-activation-email', authController.resendActivationEmail );
// export the router
export default authRouter;
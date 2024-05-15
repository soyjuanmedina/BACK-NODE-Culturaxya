"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
let authController = new auth_controller_1.AuthController();
// specifies the endpoint and the method to call
authRouter.post('/signup', authController.registerUser);
authRouter.post('/signin', authController.login);
authRouter.post('/user/confirm-email', authController.confirmEmail);
// export the router
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = __importDefault(require("../controllers/question.controller"));
const questionRouter = (0, express_1.Router)();
// specifies the endpoint and the method to call
questionRouter.get('/', question_controller_1.default.getAll);
// export the router
exports.default = questionRouter;
//# sourceMappingURL=question.routes.js.map
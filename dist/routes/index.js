"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_routes_1 = __importDefault(require("./question.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = (0, express_1.Router)();
// define the base path and the router that's going to be called
routes.use('/questions', question_routes_1.default);
routes.use('/auth', auth_routes_1.default);
// export the route
exports.default = routes;
//# sourceMappingURL=index.js.map
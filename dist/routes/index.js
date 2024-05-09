"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_routes_1 = require("./question.routes");
const auth_routes_1 = require("./auth.routes");
const routes = (0, express_1.Router)();
// define the base path and the router that's going to be called
routes.use('/questions', question_routes_1.default);
routes.use('/auth', auth_routes_1.default);
// export the route
exports.default = routes;

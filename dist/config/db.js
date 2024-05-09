"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = require("mysql2");
exports.connection = (0, mysql2_1.createPool)({
    host: 'sql8.freesqldatabase.com',
    port: 3306,
    user: 'sql8704762',
    password: 'P5w4aW9vY2',
    database: 'sql8704762'
});

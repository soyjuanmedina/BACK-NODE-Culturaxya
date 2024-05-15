"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = require("mysql2");
exports.connection = (0, mysql2_1.createPool)({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'culturaxya'
});
//# sourceMappingURL=db.local.js.map
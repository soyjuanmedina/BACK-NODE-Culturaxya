"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const postgres_1 = __importDefault(require("postgres"));
const connectionOptions = {
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.tagjtsodscjaeabgdxzw',
    password: 'm*WUuffiiP0E',
    database: 'postgres'
};
exports.connection = (0, postgres_1.default)('postgres://postgres.tagjtsodscjaeabgdxzw:liv@BZwkz91H@aws-0-eu-central-1.pooler.supabase.com:5432/postgres', connectionOptions);
// export default connection
//# sourceMappingURL=db.prod.js.map
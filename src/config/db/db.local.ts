import { createPool } from 'mysql2';

export const connection=createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'culturaxya'
});

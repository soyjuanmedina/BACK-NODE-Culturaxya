import { createPool } from 'mysql2';

export const connection = createPool({
  host: 'sql8.freesqldatabase.com',
  port: 3306,
  user: 'sql8704762',
  password: 'P5w4aW9vY2',
  database: 'sql8704762'
});

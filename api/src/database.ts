/* eslint-disable @typescript-eslint/comma-dangle */
import * as mysql from 'mysql2';

require('dotenv').config();
const connectionOptions: mysql.ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const database = mysql.createConnection(connectionOptions);

database.connect((err) => {
  if (err) {
    console.error(
      `\x1b[31m[ERROR]:\x1b[0m Failed to connect to database: ${err.stack}`
    );
    return;
  }
  console.log('\x1b[33m[LOGS]:\x1b[0m Connected to database');
});

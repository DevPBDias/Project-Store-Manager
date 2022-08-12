const mysql = require('mysql2/promise');
require('dotenv/config');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST || 'localhost',
  user: MYSQL_USER || 'root',
  port: 3306,
  password: MYSQL_PASSWORD || 'password',
  database: MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;
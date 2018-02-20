const mysql = require('mysql'),
  migration = require('mysql-migrations'),
  connection = mysql.createPool({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.db_name
  });

migration.init(connection, `${__dirname}/migrations`);

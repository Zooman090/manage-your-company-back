const mysql = require('mysql'),
  migration = require('mysql-migrations'),
  dbConfig = require('./config/db.js'),
  connection = mysql.createPool(dbConfig);

migration.init(connection, `${__dirname}/migrations`);

const mysql = require('mysql'),
  dbConfig = require('../../config/db.js'),
  connect = mysql.createConnection(dbConfig);

module.exports = connect;

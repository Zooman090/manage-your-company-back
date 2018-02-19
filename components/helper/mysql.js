const mysql = require('mysql'),
  dbConfig = require('../../config/db.js'),
  connect = mysql.createConnection(dbConfig);

const SQL = 'select * from users';

  connect.query(SQL, (err, users) => {
    console.log(users);
  });
module.exports = connect;

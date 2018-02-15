const mysql = require('../helper/mysql.js'),
  jwt = require('jsonwebtoken'),
  connect = mysql;

class Sign {
  constructor() {

  }

  in({ headers }) {
    const { authorization = '' } = headers,
      credentials = new Buffer(authorization.split(' ')[1], 'base64').toString('ascii'),
      [ email, password ] = credentials.split(':');

    return new Promise((resolve, reject) => { //TODO: think about replace Promise by add res to args
      const sql = `SELECT * FROM users WHERE email='${ email }'`;

      connect.query(sql, (err, user) => {
        if (err) {
          reject();

          return;
        }

        if (password === user[0].password) {
          jwt.sign({ user: user[0] }, 'user_name_199', { noTimestamp: true }, (error, secret) => {
            if (error) {
              console.log(error);
              reject(403);
            }

            resolve({ secret, role: user[0].role });
          });
        } else {
          reject('Incorrect email or password.');
        }
      });
    });
  }

  up(newUser) {
    return new Promise((resolve, reject) => {
      const today = new Date(),
        user = {
          first_name: newUser.firstName,
          second_name: newUser.lastName,
          email: newUser.email,
          password: newUser.password
        },
        sql = 'INSERT INTO Users SET ?';

      connect.query(sql, user, err => {
        if (err) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  }
}

module.exports = Sign;

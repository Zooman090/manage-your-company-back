const mysql = require('../helper/mysql.js'),
  jwt = require('jsonwebtoken'),
  connect = mysql,
  { secretKey } = require('../../config/key.js');

class Sign {
  constructor() {

  }

  in({ headers }) {
    const { authorization = '' } = headers,
      credentials = new Buffer(authorization.split(' ')[1], 'base64').toString('ascii'),
      [ email, password ] = credentials.split(':');

    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email='${ email }'`;

      connect.query(sql, (err, user) => {
        if (err) {
          reject();

          return;
        }

        if (password === user[0].password) {
          jwt.sign({ user: user[0] }, secretKey, { noTimestamp: true }, (error, secret) => {
            if (error) {
              reject({ status: 403, err: error, errorMessage: 'You can\'t sign in. Please contact with techsupport.' });
            }

            resolve({ secret, role: user[0].role, status: 200 });
          });
        } else {
          reject('Incorrect email or password.');
        }
      });
    });
  }

  up({ firstName, lastName, password, email, role = 'guest' }) {
    return new Promise((resolve, reject) => {
      const user = {
          first_name: firstName,
          second_name: lastName,
          email: email,
          password: password,
          role
        },
        sql = 'INSERT INTO users SET ?';

      connect.query(sql, user, err => {
        if (err) {
          reject({ err, status: 422, errorMessage: 'We have some trouble with creating user please check your fileds and sand again.' });

          return;
        }

        jwt.sign({ user }, secretKey, { noTimestamp: true }, (error, secret) => {
          if (error) {
            reject({ status: 403, err: error, errorMessage: 'You can\'t sign in. Please contact with techsupport.' });            
          }

          resolve({ secret, role, status: 200 });
        });
      });
    });
  }
}

module.exports = Sign;

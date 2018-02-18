const mysql = require('../helper/mysql.js'),
  jwt = require('jsonwebtoken'),
  connect = mysql,
  { secretKey } = require('../../config/key.js'),
  checkEmailOnUniqueness = email => {
    return new Promise((resolve, reject) => {
      const SQL = `select * from user where email =${email}`;

      connect.query(SQL, (err, users) => {
        if (err) {
          reject({ err, status: 422, errorMessage: 'We have some trouble with creating user please check your fileds and sand again.' });

          return;
        }

        if (users.length === 0) {
          resolve();
        } else {
          reject({ status: 406, errorMessage: 'This email has used.' });
        }
      });
    });
  },
  createUser = user => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users SET ?';
      
      connect.query(sql, user, err => {
        if (err) {
          reject({ err, status: 422, errorMessage: 'We have some trouble with creating user please check your fileds and sand again.' });

          return;
        }

        resolve();
      });
    });
  },
  makeUserSigned = user => {
    return new Promise((resolve, reject) => {
      jwt.sign({ user }, secretKey, { noTimestamp: true }, (error, secret) => {//TODO: implement user id
        if (error) {
          reject({ status: 403, err: error, errorMessage: 'You can\'t sign in. Please contact with techsupport.' });            
        }

        resolve({ secret, role, status: 200 });
      });
    });
  };

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
          reject({ status: 403, errorMessage: 'bad', err });//TODO: add nor

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
          reject({ status: '404', errorMessage: 'Incorrect email or password.', err: '' });
        }
      });
    });
  }

  up({ firstName, lastName, password, email, role = 'guest' }) {//TODO: refactor this
    const user = {
      first_name: firstName,
      second_name: lastName,
      email,
      password,
      role
    };

    return checkEmailOnUniqueness(email)
      .then(() => createUser(user))
      .then(() => makeUserSigned(user));
  }
}

module.exports = Sign;

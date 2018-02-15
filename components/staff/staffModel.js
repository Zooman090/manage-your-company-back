const mysql = require('../helper/mysql.js'),
  connect = mysql,
  jwt = require('jsonwebtoken');

class Staff {
  constructor() {

  }

  create({ cookies = { secret: '' } }, { name, position, experience, skills, id: companyId }) {
    return new Promise((resolve, reject) => {
      const { secret } = cookies;

      if (!secret) {
        reject({ status: 401, errorMessage: 'You have not signed in yet' });
        return;
      }

      let user = '';

      try {
        user = jwt.verify(secret, 'user_name_199');
      } catch (error) {
        reject({ status: 401, errorMessage: 'You have not signed in yet' });
        return;
      }

      if (user.user.role === 'guest') {
        reject({ status: 403, errorMessage: 'You don\'t have access to create company' });

        return;
      }

      const sql = 'INSERT INTO staff (name, position, experience, skills, company_id, main_user_id) VALUES ?',
        mainUserId = user.user.main_user_id ? user.user.main_user_id : user.user.user_id,
        value = [ [ name, position, experience, skills, companyId, mainUserId ] ];

      connect.query(sql, [ value ], err => {
        if (err) {
          reject({ status: 403, errorMessage: err });
          throw err;
        }

        resolve();
      });
    });
  }

  getStaff({ companyID } = { companyID: 0 }) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM staff WHERE company_id = ${companyID}`;

      connect.query(sql, (err, stuffs) => {
        if (err) {
          console.log(err);
          reject(err);

          return;
        }

        console.log(stuffs);
        
        resolve(stuffs);
      });
    });
  }
}

module.exports = Staff;

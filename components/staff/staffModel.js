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
        reject({ status: 401, errorMessage: 'You have not signed in yet', err: error });
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
          reject({ status: 403, errorMessage: 'User didn\'t save. Please check fields.' });
          throw err;
        }

        
        const SQL = `update company set hasStaff = true where company_id = ${companyId} `;

        connect.query(SQL, (error) => {
          if (error) {
            reject({ status: 503, errorMessage: '', err: error });
  
            return;
          }
          
          resolve({ status: 200, message: 'Created' });
        });
      });
    });
  }

  getStaff({ companyID } = { companyID: 0 }) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM staff WHERE company_id = ${companyID}`;

      connect.query(sql, (err, staffs) => {
        if (err) {
          reject({ status: 409, errorMessage: 'We can\'t get your staffs', err });

          return;
        }

        resolve({ status: 200, staffs });
      });
    });
  }
}

module.exports = Staff;

let mysql = require('../helper/mysql.js'),
  connect = mysql,
  jwt = require('jsonwebtoken');

class Company {
  constructor() {

  }

  create({ cookies = { secret: '' } }, { name, type, address }) {
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

      const { role, user_id: userId } = user.user,
        sql = 'INSERT INTO company (name, type, address, main_user_id) VALUES ?';

      if (role !== 'boss') {
        reject({ status: 403, errorMessage: 'you don\'t have access to create company' });
        
        return;
      }

      
      let value = [ [ name, type, address, userId ] ];

      connect.query(sql, [ value ], err => {
        if (err) {
          reject({ status: 422, errorMessage: 'You sended wrong fields.', err });

          return;
        }

        resolve({ status: 200, message: 'Created' });
      });
    });
  }

  getCompany({ cookies = { secret: '' } }) {
    const { secret } = cookies;

    return new Promise((resolve, reject) => {
      let user = '';

      try {
        user = jwt.verify(secret, 'user_name_199');
      } catch (error) {
        reject({ status: 401, errorMessage: 'You have not signed in yet' });
        return;
      }

      const sql = `SELECT * FROM company WHERE main_user_id=${user.user.user_id}`;

      connect.query(sql, (err, companies) => {
        if (err) {
          reject({ status: 401, errorMessage: 'You have not signed in yet', err });

          return;
        }
        
        resolve({ status: 200, companies });
      });
    
    });
  }
}

module.exports = Company;

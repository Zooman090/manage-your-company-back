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

      console.log(user);

      const { role, user_id: userId } = user; 

      console.log(role);

      if (role !== 'boss') {
        reject({ status: 403, errorMessage: 'you don\'t have access to create company' });
        
        return;
      }

      const sql = 'INSERT INTO company (name, type, address, staff_id, main_user_id) VALUES ?';

      let value = [ [ name, type, address, 1, userId ] ]; //TODO: make staff_id dynamic

      connect.query(sql, [ value ], err => {
        if (err) {
          console.log(err);
          reject({ status: 422, errorMessage: 'You sended wrong fields.' });
          throw err;
        }

        resolve();
      });
    });
  }

  getCompany(userID = 1) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM company WHERE main_user_id=1`;

      connect.query(sql, (err, companies) => {
        if (err) {
          reject(err);

          return;
        }
        
        resolve(companies);
      });
    })
      .then(companies => {
        return new Promise((res, rej) => {
          const sql = `SELECT * FROM staff  WHERE main_user_id=${ userID }`;

          connect.query(sql, (err, staffs) => {
            if (err) {
              rej(err);

              return;
            }
            
            res({ staffs, companies });
          });
        });
      })
      .then(({ companies }) => {
        return companies;
      });
  }
}

module.exports = Company;

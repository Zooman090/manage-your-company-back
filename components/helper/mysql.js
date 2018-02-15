let mysql = require('mysql'),
  dbConfig = require('../../config/db.js'),
  connect = mysql.createConnection(dbConfig);

// connect.connect((error) => {
//   if (error) {
//     throw err;
//   }

//   // const sql = "SELECT staff_id FROM company WHERE staff_id = (SELECT MAX(staff_id) FROM company)";
//   const sql = 'select * from staff';
//   // const sql = 'update users set role = "boss" where email = "dmytro.paniotko@teamvoy.com"'
//   // 'CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT,`first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,`password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,`created` datetime NOT NULL,`modified` datetime NOT NULL,PRIMARY KEY (`id`)) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;';

//   connect.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }

//     console.log('Result: ', result);
//   });
// });

module.exports = connect;

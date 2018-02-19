const production = {
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.db_name
  },
  development = {
    host: 'localhost',
    user: 'dmytro.paniontko',
    password: 'zooman090',
    database: 'companynavigator'
  };

module.exports = process.env.NODE_ENV.trim() === 'development' ? development : production;

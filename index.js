const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  routers = require('./components/routers.js'),
  cookieParser = require('cookie-parser'),
  env = require('node-env-file');

if (process.env.NODE_ENV.trim() === 'development') {
  env(`${__dirname}/.env`);
}

require('./components/helper/mysql.js');

app.use((req, res, next ) => {
  res.header('Access-Control-Allow-Origin', process.env.front_url);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Credentials');
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(routers);

app.listen(process.env.PORT || 8008, () => {
  console.log('Server running on http://localhost:8008');
});

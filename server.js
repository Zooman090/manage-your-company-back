const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  routers = require('./components/routers.js'),
  cookieParser = require('cookie-parser');

require('./components/helper/mysql.js');

app.use((req, res, next ) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
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

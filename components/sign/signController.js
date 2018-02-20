const url = require('../../config/url.js'),
  Sign = require('./signModel.js'),
  sign = new Sign(),
  signIn = (req, res) => {
    sign
      .in(req)
      .then(({ secret, role, status }) => {
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000,
          maxAge = ONE_YEAR,
          expires = new Date(new Date() + ONE_YEAR),
          path = '/',
          cookieOptions = { maxAge, expires, path };

        res.status(status);
        res.cookie('secret', secret, cookieOptions);
        res.send({ role });
        res.end();
      })
      .catch(({ errorMessage, err, status }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  },
  signUp = (req, res) => {
    sign
      .up(req.body)
      .then(({ secret, role, status }) => {
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000,
          maxAge = ONE_YEAR,
          expires = new Date(new Date() + ONE_YEAR),
          path = '/',
          cookieOptions = { maxAge, expires, path };

        res.status(status);
        res.cookie('secret', secret, cookieOptions);
        res.send({ role });
        res.end();
      })
      .catch(({ status, errorMessage, err }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  },
  signOut = (req, res) => {
    const path = '/',
      ONE_YEAR = 365 * 24 * 60 * 60 * 1000,
      maxAge = ONE_YEAR,
      expires = new Date(new Date() + ONE_YEAR),
      status = 200,
      cookieOptions = { maxAge, expires, path };

    res.status(status);
    res.cookie('secret', '', cookieOptions);
    res.json({ message: 'Sign out' });
    res.end();
  };

module.exports = { signIn, signUp, signOut };

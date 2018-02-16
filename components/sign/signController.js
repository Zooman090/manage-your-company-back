const Sign = require('./signModel.js'),
  sign = new Sign(),
  signIn = (req, res) => {
    sign
      .in(req)
      .then(({ secret, role, status }) => {
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000,
          maxAge = 3600000,
          expires = new Date(new Date() + ONE_YEAR),
          path = '/',
          domain = 'localhost',
          cookieOptions = { maxAge, expires, path, domain };

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
          maxAge = 3600000,
          expires = new Date(new Date() + ONE_YEAR),
          path = '/',
          domain = 'localhost',
          cookieOptions = { maxAge, expires, path, domain };

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
      domain = 'localhost',
      status = 200,
      cookieOptions = { path, domain };

    res.status(status);
    res.cookie('secret', '', cookieOptions);
    res.end();
  };

module.exports = { signIn, signUp, signOut };

const Sign = require('./signModel.js'),
  sign = new Sign(),
  signIn = (req, res) => {
    sign
      .in(req)
      .then(({ secret, role }) => {
        console.log(secret, role);
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

        res.status(200);
        res.cookie('secret', secret, { maxAge: 3600000, expires: new Date(new Date(0) + ONE_YEAR), path: '/', domain: 'localhost' });
        res.send({ role }); //TODO: add real role
        res.end();
      })
      .catch(message => {
        res.status(401);
        res.send(message);
        res.end();
      });
  },
  signUp = (req, res) => {
    sign
      .up(req.body)
      .then(() => {
        res.status(200);
        res.end();
      })
      .catch(() => {
        res.status(401);
        res.end();
      });
  },
  signOut = (req, res) => {
    res.status(200);
    res.cookie('secret', '', { path: '/', domain: 'localhost' });
    res.send({ test: 'test' });
    res.end();
  };

module.exports = { signIn, signUp, signOut };

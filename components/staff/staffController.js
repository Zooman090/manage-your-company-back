const Staff = require('./staffModel.js'),
  staff = new Staff(),
  create = (req, res) => {
    staff
      .create(req, req.body)
      .then(companies => {
        res.send(companies);
        res.status(200);
        res.end();
      })
      .catch(({ status, errorMessage }) => {
        res.status(status).json({ errorMessage });
        res.end();
      });
  },
  get = (req, res) => {
    staff
      .getStaff(req.params)
      .then(staffs => {
        res.json({ staffs });
        res.status(200);
        res.send();
        res.end();
      })
      .catch(({ status, errorMessage }) => {
        res.status(status).json({ errorMessage });
        res.send();
        res.end();
      });
  };

module.exports = { get, create };

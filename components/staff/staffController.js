const Staff = require('./staffModel.js'),
  staff = new Staff(),
  create = (req, res) => {
    staff
      .create(req, req.body)
      .then(({ companies, status }) => {
        res.send(companies);
        res.status(status);
        res.end();
      })
      .catch(({ status, errorMessage, err = '' }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  },
  get = (req, res) => {
    staff
      .getStaff(req.params)
      .then(({ staffs, status }) => {
        res.status(status).json({ staffs });
        res.end();
      })
      .catch(({ status, errorMessage, err = '' }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  };

module.exports = { get, create };

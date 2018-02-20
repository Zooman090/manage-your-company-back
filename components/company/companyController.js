const Company = require('./companyModel.js'),
  company = new Company(),
  get = (req, res) => {
    company
      .getCompany(req)
      .then(({ companies, status }) => {
        res.send(companies);
        res.status(status);
        res.end();
      })
      .catch(({ status, errorMessage, err }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  },
  create = (req, res) => {
    company
      .create(req, req.body)
      .then(({ status, message }) => {
        res.status(status).json({ message });
        res.end();
      })
      .catch(({ status, errorMessage, err }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  },
  list = (req, res) => {
    company
      .getCompany(req)
      .then(({ companies, status }) => {
        const companiesList = companies.map(({ name: title, company_id: value }) => {
          return { title, value };
        });

        res.status(status).json(companiesList);
      })
      .catch(({ status, errorMessage, err }) => {
        res.status(status).json({ errorMessage, err });
        res.end();
      });
  };

module.exports = { get, create, list };

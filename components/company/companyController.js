const Company = require('./companyModel.js'),
  company = new Company(),
  get = (req, res) => {
    company
      .getCompany()
      .then(companies => {
        res.send(companies);
        res.status(200);
        res.end();
      })
      .catch(() => {
        res.status(404);
      });
  },
  create = (req, res) => {
    company
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
  list = (req, res) => {
    company
      .getCompany()
      .then(companies => {
        const companiesList = companies.map(({ name: title, company_id: value }) => {
          return { title, value };
        });

        res.status(200).json(companiesList);
      });
  };

module.exports = { get, create, list };

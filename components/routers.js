let express = require('express'),
  router = express.Router(),
  company = require('./company/companyController.js'),
  staff = require('./staff/staffController.js'),
  sign = require('./sign/signController.js');

router.post('/company/create', company.create);
router.get('/company/get', company.get);
router.get('/company/list', company.list);


router.post('/staff/create', staff.create);
router.get('/staff/get/:companyID', staff.get);

router.post('/sign/in', sign.signIn);
router.post('/sign/up', sign.signUp);
router.post('/sign/out', sign.signOut);

module.exports = router;

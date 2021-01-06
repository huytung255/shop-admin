const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/adminController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');
router.use(express.static('public'));

/* GET users listing. */
router.get('/detail', checkAdminAuthenticated, admincontroller.detail);
router.post('/update', checkAdminAuthenticated, admincontroller.update);
router.get('/changepassword', checkAdminAuthenticated, admincontroller.GetChangePasswordPage);
router.post('/changepassword', checkAdminAuthenticated, admincontroller.changepw);
//router.get('/statistic', admincontroller.statistic);
router.get('/chart-by-date', checkAdminAuthenticated, function(req, res, next) {
    res.render('chart-by-date');
  });
  router.get('/chart-by-month', checkAdminAuthenticated, function(req, res, next) {
    res.render('chart-by-month');
  });
  router.get('/chart-by-year', checkAdminAuthenticated, function(req, res, next) {
    res.render('chart-by-year');
  });
  router.get('/most-viewed-items', checkAdminAuthenticated, function(req, res, next) {
    res.render('most-viewed-items');
  });
  router.get('/most-purchased-items', checkAdminAuthenticated,function(req, res, next) {
    res.render('most-purchased-items');
  });
  router.get('/customers-by-age', checkAdminAuthenticated,function(req, res, next) {
    res.render('customers-by-age');
  });
module.exports = router;

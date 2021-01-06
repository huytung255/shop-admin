const express = require('express');
const router = express.Router();
const { checkNotAuthenticated } = require('../passport/authcontroller');
const passport = require('passport');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('login');
});
// router.get('/index', function(req, res, next) {
//   res.render('index');
// });
router.get('/login', checkNotAuthenticated, (req, res, next) => {
  res.render('login', {layout: "layoutlogin", message: res.message.error});
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/login',
  failureRedirect: '/login',
  failureFlash: true
})
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});
router.get('/chart-by-date', function(req, res, next) {
  res.render('chart-by-date');
});
router.get('/chart-by-month', function(req, res, next) {
  res.render('chart-by-month');
});
router.get('/chart-by-year', function(req, res, next) {
  res.render('chart-by-year');
});
router.get('/most-viewed-items', function(req, res, next) {
  res.render('most-viewed-items');
});
router.get('/most-purchased-items', function(req, res, next) {
  res.render('most-purchased-items');
});
router.get('/customers-by-age', function(req, res, next) {
  res.render('customers-by-age');
});
module.exports = router;

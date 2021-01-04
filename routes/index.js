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
module.exports = router;

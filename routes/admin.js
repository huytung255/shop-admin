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

module.exports = router;

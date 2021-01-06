const express = require('express');
const router = express.Router();
const staffcontroller = require('../controllers/staffController');
const { checkStaffAuthenticated } = require('../passport/authcontroller');
const { checkAdminAuthenticated } = require('../passport/authcontroller');

router.use(express.static('public'));

/* GET users listing. */
// router.get('/', staffcontroller.stafflist);
// router.get('/detail/:id', staffcontroller.detail);
// router.get('/addstaff',staffcontroller.addstaff);
// router.post('/addstaff/create',staffcontroller.create);
// router.post('/delete/:id', staffcontroller.delete);

router.get('/detail/:id', checkStaffAuthenticated, staffcontroller.detail);
router.post('/update/:id', checkStaffAuthenticated, staffcontroller.update);
router.get('/changepassword', checkStaffAuthenticated, staffcontroller.GetChangePasswordPage);
router.post('/changepassword', checkStaffAuthenticated, staffcontroller.changepw);

router.get('/adminview', checkAdminAuthenticated, staffcontroller.stafflist);
router.get('/adminview/detail/:id', checkAdminAuthenticated, staffcontroller.detailviewadmin);
router.get('/addstaff', checkAdminAuthenticated, staffcontroller.addstaff);
router.post('/addstaff/create', checkAdminAuthenticated, staffcontroller.create);
router.post('/delete/:id', checkAdminAuthenticated, staffcontroller.delete);
module.exports = router;

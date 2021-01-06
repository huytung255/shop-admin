const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');
const { checkStaffAuthenticated } = require('../passport/authcontroller');
const { checkAuthenticated } = require('../passport/authcontroller');
router.use(express.static('public'));

router.get('/', checkAdminAuthenticated, orderController.orderList);
router.get('/filter', checkAdminAuthenticated, orderController.orderListByStatus);
router.get('/detail', checkAuthenticated, orderController.orderDetail);
router.get('/staffview', checkStaffAuthenticated, orderController.orderHistory);

router.post('/confirm/:id/:value', checkStaffAuthenticated, orderController.updateStateOrder)

router.get('/staffview/confirmedorders',checkStaffAuthenticated, orderController.myconfirmorders);
module.exports = router;
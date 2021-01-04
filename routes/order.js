const express= require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');

router.use(express.static('public'));

router.get('/', checkAdminAuthenticated, orderController.orderList);
router.get('/filter', checkAdminAuthenticated, orderController.orderListByStatus);
router.get('/detail', checkAdminAuthenticated, orderController.orderDetail);


module.exports = router;
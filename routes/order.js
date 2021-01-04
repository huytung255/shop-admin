const express= require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.use(express.static('public'));

router.get('/',orderController.orderList);
router.get('/filter',orderController.orderListByStatus);
router.get('/detail',orderController.orderDetail);


module.exports = router;
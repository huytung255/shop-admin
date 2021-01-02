const express = require('express');
const router = express.Router();
const customercontroller = require('../controllers/customerController');
router.use(express.static('public'));

/* GET users listing. */
router.get('/', customercontroller.customerlist);
router.get('/detail/:id', customercontroller.detail);
router.post('/lock/:id', customercontroller.lock);
router.post('/unlock/:id', customercontroller.unlock);

module.exports = router;

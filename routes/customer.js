const express = require('express');
const router = express.Router();
const customercontroller = require('../controllers/customerController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');
router.use(express.static('public'));

/* GET users listing. */
router.get('/', checkAdminAuthenticated, customercontroller.customerlist);
router.get('/detail/:id', checkAdminAuthenticated, customercontroller.detail);
router.post('/lock/:id', checkAdminAuthenticated, customercontroller.lock);
router.post('/unlock/:id', checkAdminAuthenticated, customercontroller.unlock);

module.exports = router;

const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/adminController');
router.use(express.static('public'));

/* GET users listing. */
router.get('/detail', admincontroller.detail);
router.post('update', admincontroller.update);
//router.get('/statistic', admincontroller.statistic);

module.exports = router;

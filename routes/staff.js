const express = require('express');
const router = express.Router();
const staffcontroller = require('../controllers/staffController');
router.use(express.static('public'));

/* GET users listing. */
router.get('/', staffcontroller.stafflist);
router.get('/detail/:id', staffcontroller.detail);
router.get('/addstaff',staffcontroller.addstaff);
router.post('/addstaff/create',staffcontroller.create);
router.post('/delete/:id', staffcontroller.delete)
module.exports = router;

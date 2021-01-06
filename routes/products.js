const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');
const {checkAuthenticated} = require('../passport/authcontroller');
const {checkStaffAuthenticated} = require('../passport/authcontroller');
router.use(express.static('public'));

router.get('/', checkAuthenticated, productController.productlist);
// router.get('/staffview/',checkStaffAuthenticated, productController.producliststaff);
router.get('/addnew', checkAdminAuthenticated, productController.addnew);
router.post('/addnew/create', checkAdminAuthenticated, productController.create);
router.get('/detail', checkAuthenticated, productController.detail);
router.post('/detail/edit', checkAdminAuthenticated, productController.edit);
router.get('/detail/remove', checkAdminAuthenticated, productController.remove);

router.get('/search', checkAuthenticated, productController.search);
router.get('/type', checkAuthenticated, productController.searchByType);

router.post('/update/:id/:value', checkStaffAuthenticated, productController.setstate);

// router.get('/staffview/',checkStaffAuthenticated, productController.producliststaff);
// router.get('/staffview/')
module.exports = router;

const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');

router.use(express.static('public'));

router.get('/', checkAdminAuthenticated, productController.productlist);
router.get('/addnew', checkAdminAuthenticated, productController.addnew);
router.post('/addnew/create', checkAdminAuthenticated, productController.create);
router.get('/detail', checkAdminAuthenticated, productController.detail);
router.post('/detail/edit', checkAdminAuthenticated, productController.edit);
router.get('/detail/remove', checkAdminAuthenticated, productController.remove);

router.get('/search', checkAdminAuthenticated, productController.search);
router.get('/type', checkAdminAuthenticated, productController.searchByType);

module.exports = router;

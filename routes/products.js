const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.use(express.static('public'));

router.get('/',productController.productlist);
router.get('/addnew',productController.addnew);
router.post('/addnew/create',productController.create);
router.get('/detail',productController.detail);
router.post('/detail/edit',productController.edit);
router.get('/detail/remove',productController.remove);

router.get('/search',productController.search);
router.get('/type',productController.searchByType);

module.exports = router;

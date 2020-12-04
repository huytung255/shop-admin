const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.use(express.static('public'));

router.get('/',productController.productlist);
router.get('/addnew',productController.addnew);
router.post('/addnew/create',productController.create);
router.post('/detail/edit.:id',productController.edit);
router.get('/:type.:id',productController.detail);
router.post('/delete',productController.delete);

module.exports = router;

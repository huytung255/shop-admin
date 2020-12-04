const express= require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.use(express.static('public'));

router.get('/',productController.productlist);
router.get('/addnew',productController.addnew);
router.post('/',productController.create);

module.exports = router;
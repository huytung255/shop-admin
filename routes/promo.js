const express= require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');

router.use(express.static('public'));

router.get('/',promoController.promoList);
router.get('/create',promoController.createPromoLayout);
router.post('/create',promoController.createPromo);
router.get('/detail',promoController.promoDetail);
router.post('/detail/edit',promoController.promoEdit);
router.get('/detail/toggle',promoController.promoToggle);
module.exports = router;
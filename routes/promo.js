const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');
const { checkAdminAuthenticated } = require('../passport/authcontroller');
router.use(express.static('public'));

router.get('/', checkAdminAuthenticated, promoController.promoList);
router.get('/create', checkAdminAuthenticated, promoController.createPromoLayout);
router.post('/create', checkAdminAuthenticated, promoController.createPromo);
router.get('/detail', checkAdminAuthenticated, promoController.promoDetail);
router.post('/detail/edit', checkAdminAuthenticated, promoController.promoEdit);
router.get('/detail/toggle', checkAdminAuthenticated, promoController.promoToggle);
module.exports = router;
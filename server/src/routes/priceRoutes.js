const express = require('express');
const priceController = require('../controllers/priceController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/prices', priceController.getMarketPrices);

router.use(authMiddleware.protect); // Protect all routes after this middleware

router.route('/alerts')
    .get(priceController.getMyAlerts)
    .post(priceController.createPriceAlert);

module.exports = router;

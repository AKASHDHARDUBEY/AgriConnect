const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProducts)
    .post(
        authMiddleware.protect,
        authMiddleware.restrictTo('FARMER', 'ADMIN'),
        productController.uploadProductImage,
        productController.createProduct
    );

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(
        authMiddleware.protect,
        authMiddleware.restrictTo('FARMER', 'ADMIN'),
        productController.updateProduct
    )
    .delete(
        authMiddleware.protect,
        authMiddleware.restrictTo('FARMER', 'ADMIN'),
        productController.deleteProduct
    );

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const prisma = new PrismaClient();
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/products');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `product-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadProductImage = upload.single('image');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: { farmer: { select: { name: true, email: true } } }
        });

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // req.user is guaranteed to exist due to protect middleware
        // req.user.role is guaranteed to be FARMER due to restrictTo middleware

        const { name, description, price, quantity, unit } = req.body;
        const imageUrl = req.file ? `/img/products/${req.file.filename}` : null;

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                quantity: parseFloat(quantity),
                unit,
                imageUrl,
                farmerId: req.user.id
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { farmer: { select: { name: true, email: true } } }
        });

        if (!product) {
            return next(new AppError('No product found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!product) {
            return next(new AppError('No product found with that ID', 404));
        }

        // Check if the user is the owner of the product or an admin
        if (product.farmerId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new AppError('You are not authorized to update this product', 403));
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });

        res.status(200).json({
            status: 'success',
            data: {
                product: updatedProduct
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!product) {
            return next(new AppError('No product found with that ID', 404));
        }

        // Check if the user is the owner of the product or an admin
        if (product.farmerId !== req.user.id && req.user.role !== 'ADMIN') {
            return next(new AppError('You are not authorized to delete this product', 403));
        }

        await prisma.product.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};

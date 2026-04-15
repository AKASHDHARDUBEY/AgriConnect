const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new product listing
router.post('/list', async (req, res) => {
    try {
        const { cropName, quantity, price, imageUrl, farmerId, harvestDate } = req.body;
        const newListing = await prisma.listing.create({
            data: { 
                cropName, 
                quantity: parseFloat(quantity), 
                price: parseFloat(price), 
                imageUrl, 
                farmerId: parseInt(farmerId),
                harvestDate: new Date(harvestDate)
            }
        });
        res.status(201).json({ message: "Product listed successfully!", data: newListing });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong while listing" });
    }
});

// Get all products for the marketplace
router.get('/all', async (req, res) => {
    try {
        const products = await prisma.listing.findMany({
            include: { 
                farmer: {
                    select: { name: true, phone: true, location: true } 
                } 
            },
            orderBy: { createdAt: 'desc' } // Show newest listings first
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch products" });
    }
});

module.exports = router;

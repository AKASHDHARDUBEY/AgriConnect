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

// Haversine distance calculator between GPS points
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

const cityCoords = {
    "nashik": { lat: 20.0016, lon: 73.7898 },
    "pune": { lat: 18.5204, lon: 73.8567 },
    "mumbai": { lat: 19.0760, lon: 72.8777 },
    "nagpur": { lat: 21.1458, lon: 79.0882 }
};

// Get all products for the marketplace
router.get('/all', async (req, res) => {
    try {
        const buyerLat = parseFloat(req.query.lat) || 19.0760; // default to Mumbai
        const buyerLon = parseFloat(req.query.lon) || 72.8777;

        const products = await prisma.listing.findMany({
            include: { 
                farmer: {
                    select: { name: true, phone: true, location: true } 
                } 
            },
            orderBy: { createdAt: 'desc' } // Show newest listings first
        });

        // Add calculated distance to each product listing
        const productsWithDistance = products.map(product => {
            const farmerLoc = (product.farmer?.location || "Nashik").toLowerCase();
            let farmLat = 20.0016;
            let farmLon = 73.7898;

            for (const city in cityCoords) {
                if (farmerLoc.includes(city)) {
                    farmLat = cityCoords[city].lat;
                    farmLon = cityCoords[city].lon;
                    break;
                }
            }

            const distance = getDistance(buyerLat, buyerLon, farmLat, farmLon);
            return {
                ...product,
                distanceKm: parseFloat(distance.toFixed(1))
            };
        });

        res.json(productsWithDistance);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch products" });
    }
});

module.exports = router;

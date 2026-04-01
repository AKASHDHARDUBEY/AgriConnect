const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/fair-price/:cropName', async (req, res) => {
    try {
        const { cropName } = req.params;

        // 1. Fetch last 7 days of prices from all mandis
        const allPrices = await prisma.marketPrice.findMany({
            where: {
                date: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
        });

        // Filter by crop name case-insensitively (compatible with SQLite)
        const prices = allPrices.filter(p => 
            p.cropName.toLowerCase().includes(cropName.toLowerCase())
        );

        if (prices.length === 0) {
            return res.status(404).json({ message: "No market data found for this crop." });
        }

        // 2. Calculate the Average (Modal) Price
        const sum = prices.reduce((acc, curr) => acc + curr.modalPrice, 0);
        const avgPrice = sum / prices.length;

        // 3. Define Fair Range (Average +/- 10%)
        const minFair = avgPrice * 0.9;
        const maxFair = avgPrice * 1.1;

        // 4. Anomaly Detection: Check if latest price dropped by more than 20%
        const latestPrice = prices[0].modalPrice;
        const isAnomaly = latestPrice < avgPrice * 0.8;

        res.json({
            crop: cropName,
            modalPrice: avgPrice.toFixed(2),
            fairRange: {
                min: minFair.toFixed(2),
                max: maxFair.toFixed(2)
            },
            status: isAnomaly ? "ANOMALY_DETECTED" : "STABLE",
            alert: isAnomaly ? "⚠️ Abnormal price drop detected in nearby markets!" : "Market is stable."
        });

    } catch (error) {
        res.status(500).json({ error: "Intelligence engine error" });
    }
});

module.exports = router;

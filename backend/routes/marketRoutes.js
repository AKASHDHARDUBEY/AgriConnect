const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateModalPrice, getFairRange } = require('../services/priceIntelligence');

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

        // 2. Extract modalPrice values from historical records
        const modalPricesArray = prices.map(p => p.modalPrice);

        // 3. Calculate production-grade modal price and fair range
        const modalPriceVal = calculateModalPrice(modalPricesArray);
        const fairRange = getFairRange(modalPriceVal);

        // 4. Anomaly Detection: Check if latest price dropped by more than 20%
        const latestPrice = prices[0].modalPrice;
        const isAnomaly = latestPrice < modalPriceVal * 0.8;

        res.json({
            crop: cropName,
            modalPrice: modalPriceVal.toFixed(2),
            fairRange: {
                min: fairRange.min.toFixed(2),
                max: fairRange.max.toFixed(2)
            },
            status: isAnomaly ? "ANOMALY_DETECTED" : "STABLE",
            alert: isAnomaly ? "⚠️ Abnormal price drop detected in nearby markets!" : "Market is stable."
        });

    } catch (error) {
        res.status(500).json({ error: "Intelligence engine error" });
    }
});

router.get('/recommendation/:farmerId', async (req, res) => {
    try {
        // In a real app, we would fetch the farmer's soil data from the DB
        // For now, we simulate a 'Soil Analysis' and 'Market Trend' check
        const crops = [
            { name: 'Yellow Maize', profit: '+15%', risk: 'Low', reason: 'High demand in export markets and low rainfall requirement.' },
            { name: 'Organic Tomatoes', profit: '+22%', risk: 'High', reason: 'High profit but high risk of pest attack this season.' },
            { name: 'Soybeans', profit: '+8%', risk: 'Medium', reason: 'Stable market demand and good soil compatibility.' }
        ];

        // "AI Logic": Pick the crop with the best profit-to-risk ratio
        const recommendation = crops[0]; // Simulating the AI picking Maize

        res.json({
            recommendedCrop: recommendation.name,
            projectedProfit: recommendation.profit,
            riskLevel: recommendation.risk,
            analysis: recommendation.reason,
            confidenceScore: "92%"
        });
    } catch (error) {
        res.status(500).json({ error: "AI Engine failure" });
    }
});

const { getCropHealthNDVI } = require('../services/satelliteService');

router.get('/satellite-ndvi', async (req, res) => {
    try {
        const lat = parseFloat(req.query.lat) || 20.0016; // Nashik lat
        const lon = parseFloat(req.query.lon) || 73.7898; // Nashik lon
        const healthData = await getCropHealthNDVI(lat, lon);
        res.json(healthData);
    } catch (error) {
        res.status(500).json({ error: "Satellite imagery pipeline failure" });
    }
});

module.exports = router;

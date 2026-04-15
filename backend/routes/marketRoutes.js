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

const { analyzeMarketPressure } = require('../services/enamService');

router.get('/recommendation/:farmerId', async (req, res) => {
    try {
        const pressure = await analyzeMarketPressure('Yellow Maize');
        
        let advice = "eNAM supply volume is stable. Good timing to cultivate Yellow Maize.";
        let risk = "Low";
        let profit = "+15%";
        let confidence = "92%";
        
        if (pressure === "HIGH_SUPPLY_WARNING") {
            advice = "Caution: Massive supply arrivals detected in eNAM markets. Prices may drop soon. Consider selling existing inventory now.";
            risk = "High";
            profit = "+5%";
            confidence = "80%";
        } else if (pressure === "LOW_SUPPLY_OPPORTUNITY") {
            advice = "Opportunity: Shortage of arrivals detected in national markets. High demand expected. Grow Yellow Maize to maximize profits!";
            risk = "Very Low";
            profit = "+28%";
            confidence = "97%";
        }

        res.json({
            recommendedCrop: 'Yellow Maize',
            projectedProfit: profit,
            riskLevel: risk,
            analysis: advice,
            confidenceScore: confidence,
            marketPressure: pressure
        });
    } catch (error) {
        res.status(500).json({ error: "AI recommendation pipeline failure" });
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
router.get('/update-prices', async (req, res) => {
    const { fetchRealMandiPrices } = require('../services/marketDataService');
    
    // Try updating for a few main crops
    await fetchRealMandiPrices('Tomato');
    await fetchRealMandiPrices('Potato');
    
    res.json({ message: "Government data sync triggered!" });
});

module.exports = router;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const priceService = require('../services/priceService');
const AppError = require('../utils/appError');

exports.getMarketPrices = async (req, res, next) => {
    try {
        const { state, commodity } = req.query;

        // 1. Try to fetch from database cache first (optional optimization, skipping for now to ensure freshness)

        // 2. Fetch from data.gov.in
        const govData = await priceService.fetchFromDataGov(state, commodity);

        // 3. Scrape from Agmarknet (simulated)
        const scrapedData = await priceService.scrapeAgmarknet();

        // 4. Combine and process data
        const allPrices = [...govData, ...scrapedData];

        // 5. Calculate fair ranges (simple example grouping by commodity)
        // Group by commodity for range calculation
        const groupedByCommodity = {};
        allPrices.forEach(p => {
            const comm = p.commodity || p.Commodity || 'Unknown';
            if (!groupedByCommodity[comm]) groupedByCommodity[comm] = [];

            // Normalize price structure
            const priceVal = parseFloat(p.price || p.modal_price || 0);
            if (priceVal > 0) {
                groupedByCommodity[comm].push({ ...p, price: priceVal });
            }
        });

        const insights = {};
        Object.keys(groupedByCommodity).forEach(comm => {
            const range = priceService.calculateFairRange(groupedByCommodity[comm]);
            insights[comm] = range;
        });

        res.status(200).json({
            status: 'success',
            results: allPrices.length,
            data: {
                prices: allPrices,
                insights
            }
        });

    } catch (err) {
        next(err);
    }
};

exports.createPriceAlert = async (req, res, next) => {
    try {
        const { commodity, targetPrice, condition } = req.body;

        if (!commodity || !targetPrice || !condition) {
            return next(new AppError('Please provide commodity, targetPrice and condition', 400));
        }

        const newAlert = await prisma.priceAlert.create({
            data: {
                userId: req.user.id,
                commodity,
                targetPrice: parseFloat(targetPrice),
                condition // 'BELOW' or 'ABOVE'
            }
        });

        res.status(201).json({
            status: 'success',
            data: {
                alert: newAlert
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getMyAlerts = async (req, res, next) => {
    try {
        const alerts = await prisma.priceAlert.findMany({
            where: { userId: req.user.id }
        });

        res.status(200).json({
            status: 'success',
            results: alerts.length,
            data: {
                alerts
            }
        });
    } catch (err) {
        next(err);
    }
};

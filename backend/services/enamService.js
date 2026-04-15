const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Simulates or fetches actual commodity arrival quantities from eNAM endpoints.
 */
const fetchENAMArrivals = async (cropName) => {
    try {
        console.log(`📡 Fetching daily arrival volume from eNAM for: ${cropName}...`);
        
        // Pseudo-random daily volume to simulate live updates (between 100 and 1000 tons)
        const mockArrival = Math.floor(100 + Math.random() * 900);
        
        // Save history in MarketArrivals table
        await prisma.marketArrivals.create({
            data: {
                cropName,
                mandiName: "National Agriculture Market (eNAM)",
                quantity: parseFloat(mockArrival),
                date: new Date()
            }
        });

        return mockArrival;
    } catch (err) {
        console.error("❌ eNAM arrivals fetch error:", err.message);
        return 500; // fallback standard daily volume
    }
};

/**
 * Analyzes market trading supply pressure based on eNAM volumes.
 */
const analyzeMarketPressure = async (cropName) => {
    const currentArrivals = await fetchENAMArrivals(cropName);
    const avgArrivals = 500; // typical baseline average for nashik mandis

    if (currentArrivals > avgArrivals * 1.5) {
        return "HIGH_SUPPLY_WARNING"; // Oversaturated, sell now
    } else if (currentArrivals < avgArrivals * 0.5) {
        return "LOW_SUPPLY_OPPORTUNITY"; // Shortage, hold stock
    }
    return "STABLE";
};

module.exports = {
    fetchENAMArrivals,
    analyzeMarketPressure
};

const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY;
const BASE_URL = "https://api.data.gov.in/resource";
// Standard government resource ID for Agmarknet Realtime Mandi Daily Prices
const RESOURCE_ID = "9ef8428d-0581-4475-ab1c-e1d95aae2212";

const fetchRealMandiPrices = async (cropName) => {
    try {
        if (!DATA_GOV_API_KEY) {
            console.warn("⚠️ DATA_GOV_API_KEY not configured. Falling back to local data aggregation simulation.");
            // Simulate upserting realistic mock prices for testing/demo
            const fallbackPrices = [
                { cropName: cropName, mandiName: "Nashik Mandi", modalPrice: 24, minPrice: 20, maxPrice: 28 },
                { cropName: cropName, mandiName: "Pune Mandi", modalPrice: 23, minPrice: 19, maxPrice: 27 },
                { cropName: cropName, mandiName: "Mumbai Mandi", modalPrice: 26, minPrice: 21, maxPrice: 30 }
            ];
            
            for (const price of fallbackPrices) {
                await prisma.marketPrice.create({
                    data: {
                        cropName: price.cropName,
                        mandiName: price.mandiName,
                        modalPrice: price.modalPrice,
                        minPrice: price.minPrice,
                        maxPrice: price.maxPrice,
                        date: new Date()
                    }
                });
            }
            console.log(`✅ Simulated daily market updates for ${cropName}`);
            return;
        }

        console.log(`📡 Fetching real-time Agmarknet prices from Data.gov.in for: ${cropName}...`);
        const url = `${BASE_URL}/${RESOURCE_ID}?api-key=${DATA_GOV_API_KEY}&format=json&filters[commodity]=${cropName}&limit=10`;
        const response = await axios.get(url);
        
        const records = response.data.records;
        if (!records || records.length === 0) {
            console.log(`ℹ️ No government records found for commodity: ${cropName}`);
            return;
        }

        // Map government records (Agmarknet schema) to our local schema
        const formattedPrices = records.map(rec => ({
            cropName: rec.commodity || cropName,
            mandiName: `${rec.market}, ${rec.state}`,
            modalPrice: parseFloat(rec.modal_price) || 0,
            minPrice: parseFloat(rec.min_price) || 0,
            maxPrice: parseFloat(rec.max_price) || 0,
            date: new Date(rec.arrival_date || Date.now()),
        }));

        for (const price of formattedPrices) {
            await prisma.marketPrice.create({
                data: price
            });
        }

        console.log(`✅ Successfully stored ${formattedPrices.length} official Agmarknet rows for ${cropName}`);
    } catch (error) {
        console.error(`❌ Error fetching Data.gov.in mandi prices for ${cropName}:`, error.message);
    }
};

module.exports = { fetchRealMandiPrices };

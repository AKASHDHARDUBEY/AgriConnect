const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Import Routes
const productRoutes = require('./routes/productRoutes');
const marketRoutes = require('./routes/marketRoutes');

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/market', marketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // Trigger startup market aggregation for testing
    console.log("⚙️ Triggering startup market price aggregation...");
    const { fetchRealMandiPrices } = require('./services/marketDataService');
    const cropsToTrack = ['Tomato', 'Potato', 'Yellow Maize', 'Wheat', 'Onion'];
    cropsToTrack.forEach(crop => fetchRealMandiPrices(crop));
});

// Configure Cron Job for midnight runs
const cron = require('node-cron');
const { fetchRealMandiPrices } = require('./services/marketDataService');

cron.schedule('0 0 * * *', async () => {
    console.log("⏰ Running Scheduled Daily Price Update...");
    const cropsToTrack = ['Tomato', 'Potato', 'Yellow Maize', 'Wheat', 'Onion'];
    for (const crop of cropsToTrack) {
        await fetchRealMandiPrices(crop);
    }
    console.log("✅ All daily market data updated!");
});

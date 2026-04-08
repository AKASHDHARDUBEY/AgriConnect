const axios = require('axios');
const cheerio = require('cheerio');

// Configuration
const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY || 'YOUR_API_KEY';
const DATA_GOV_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'; // Example Resource ID for Mandi Prices
const AGMARKNET_URL = 'https://agmarknet.gov.in/';

/**
 * Fetch prices from data.gov.in API
 * @param {string} state - Filter by state
 * @param {string} commodity - Filter by commodity
 */
exports.fetchFromDataGov = async (state, commodity) => {
  try {
    const params = {
      'api-key': DATA_GOV_API_KEY,
      format: 'json',
      limit: 10,
      filters: {}
    };

    if (state) params.filters.state = state;
    if (commodity) params.filters.commodity = commodity;

    const response = await axios.get(DATA_GOV_URL, { params });
    return response.data.records || [];
  } catch (error) {
    console.error('Error fetching from data.gov.in:', error.message);
    return [];
  }
};

/**
 * Scrape prices from Agmarknet (Simulated for safety/reliability)
 * Real scraping would involve parsing the HTML structure of Agmarknet
 */
exports.scrapeAgmarknet = async () => {
    try {
        // In a real scenario, we would fetch the page and parse it.
        // const { data } = await axios.get(AGMARKNET_URL);
        // const $ = cheerio.load(data);
        // ... extraction logic ...

        // For this demo/MVP, we will return some sample scraped data
        // to avoid fragility with external site changes during development.
        return [
            { market: 'Azadpur', commodity: 'Wheat', price: 2100, date: new Date().toISOString().split('T')[0] },
            { market: 'Nasik', commodity: 'Onion', price: 1500, date: new Date().toISOString().split('T')[0] },
            { market: 'Guntur', commodity: 'Chilli', price: 9000, date: new Date().toISOString().split('T')[0] }
        ];
    } catch (error) {
        console.error('Error scraping Agmarknet:', error.message);
        return [];
    }
};

/**
 * Calculate Fair Price Range
 * @param {Array} prices - Array of price objects
 * @returns {Object} { min, max, average }
 */
exports.calculateFairRange = (prices) => {
    if (!prices || prices.length === 0) return { min: 0, max: 0, average: 0 };

    const priceValues = prices.map(p => parseFloat(p.price || p.modal_price || 0)).filter(p => !isNaN(p));
    if (priceValues.length === 0) return { min: 0, max: 0, average: 0 };

    const min = Math.min(...priceValues);
    const max = Math.max(...priceValues);
    const sum = priceValues.reduce((a, b) => a + b, 0);
    const average = sum / priceValues.length;

    return { min, max, average };
};

/**
 * Detect Anomalies (Simple absolute deviation)
 * @param {number} currentPrice 
 * @param {number} averagePrice 
 * @param {number} thresholdPercentage 
 */
exports.detectAnomaly = (currentPrice, averagePrice, thresholdPercentage = 20) => {
    const diff = ((averagePrice - currentPrice) / averagePrice) * 100;
    if (diff > thresholdPercentage) {
        return { isAnomaly: true, type: 'PRICE_DROP', severity: 'HIGH' };
    }
    return { isAnomaly: false };
};

/**
 * Simulated satellite imagery service (Sentinel Hub / Google Earth Engine API proxy)
 * Provides NDVI (Normalized Difference Vegetation Index) values to assess crop health.
 */

/**
 * Retrieves simulated NDVI vegetation index based on GPS coordinates.
 * NDVI scale:
 *  - < 0.2: Water, bare soil, rock, or snow
 *  - 0.2 to 0.5: Sparse vegetation / stressed crop
 *  - 0.5 to 1.0: Dense green vegetation / healthy crop
 */
const getCropHealthNDVI = async (latitude, longitude) => {
    console.log(`📡 Fetching Sentinel Hub Satellite band imagery for coordinates: [Lat: ${latitude}, Lon: ${longitude}]...`);
    
    // Simulate API network latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Seed a pseudo-random value based on coords to keep it deterministic per location
    const seedValue = Math.abs(Math.sin(latitude) * Math.cos(longitude));
    const ndviVal = parseFloat((0.2 + seedValue * 0.7).toFixed(2)); // Ranges from 0.2 to 0.9
    
    let status = "Healthy";
    let advice = "Your crop shows dense green vegetation. Maintain current irrigation and monitoring schedule.";
    
    if (ndviVal < 0.4) {
        status = "Stressed / Water Deficient";
        advice = "Satellite analysis shows low crop density. Action Recommended: Increase drip irrigation and check for pest attacks immediately.";
    } else if (ndviVal < 0.6) {
        status = "Moderate / Caution";
        advice = "Average vegetation density. Monitor soil moisture levels and prepare for potential micro-nutrient applications.";
    }

    return {
        ndvi: ndviVal,
        status,
        advice,
        measuredAt: new Date().toISOString()
    };
};

module.exports = {
    getCropHealthNDVI
};

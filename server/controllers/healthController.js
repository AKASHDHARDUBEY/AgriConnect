const healthCheck = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'AgriConnect API health is good'
  });
};

module.exports = { healthCheck };

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');









dotenv.config();

const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({ message: 'AgriConnect API is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

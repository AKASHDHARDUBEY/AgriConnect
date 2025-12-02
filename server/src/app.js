const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./config/passport');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/errorHandler');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Implement CORS
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serving static files
app.use(express.static('public'));

// Cookie session
app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.COOKIE_KEY || 'secret_key_1', process.env.COOKIE_KEY_2 || 'secret_key_2'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');

// 2) ROUTES
app.use('/auth', authRouter);
app.use('/api/v1/products', productRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to AgriConnect API'
    });
});

// 3) ERROR HANDLING
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

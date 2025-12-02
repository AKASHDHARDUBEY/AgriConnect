const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    // Prisma unique constraint violation code is P2002
    if (err.code === 'P2002') {
        const message = `Duplicate field value: ${err.meta.target}. Please use another value!`;
        return new AppError(message, 400);
    }
    return err;
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR 💥', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        let error = { ...err };
        error.message = err.message;

        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 'P2002') error = handleDuplicateFieldsDB(error);

        sendErrorProd(error, res);
    }
};

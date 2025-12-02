const AppError = require('../utils/appError');

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // req.user is set by passport after successful authentication
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

exports.protect = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    next();
};

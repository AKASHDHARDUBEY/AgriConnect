const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const AppError = require('../utils/appError');

const prisma = new PrismaClient();

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new AppError('Please provide name, email and password', 400));
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return next(new AppError('Email already in use', 400));
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'BUYER' // Default role
            }
        });

        // Log user in immediately
        req.login(newUser, (err) => {
            if (err) return next(err);
            res.status(201).json({
                status: 'success',
                data: {
                    user: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role
                    }
                }
            });
        });

    } catch (err) {
        next(err);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return next(new AppError(info.message || 'Incorrect email or password', 401));

        req.login(user, (err) => {
            if (err) return next(err);
            res.status(200).json({
                status: 'success',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }
            });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ status: 'success' });
    });
};

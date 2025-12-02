const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
    }
);

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;

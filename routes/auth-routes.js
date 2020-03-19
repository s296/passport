const router = require('express').Router();
const passport = require('passport');

const express = require('express');
const app = express();

// var cookieParser = require('cookie-parser');
// app.use(cookieParser());


//auth login
router.get('/login', (req, res) => {
    res.render('login');
});


//auth logout
router.get('/logout', (req, res) => {
    res.send('logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google  to direct to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    // res.send(req.user);

    // res.cookie(name_of_cookie, value_of_cookie);
    // req.cookies['cookieName']
    res.redirect('/profile');
})

module.exports = router;

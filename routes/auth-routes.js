const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login');
});


//auth logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/'); 
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google  to direct to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    // res.send(req.user);
    res.redirect('/profile');
})

module.exports = router;

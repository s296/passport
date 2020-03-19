const router = require('express').Router()

const autoCheck = (req, res, next) => {
    if (!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if user is logged in
        next();
    }
};


router.get('/',autoCheck, (req, res) => {
    // res.send('you are  logged in ,this is your profile-' + req.user);
    res.render('profile',{user:req.user});
    console.log(req.user);
});

module.exports = router;
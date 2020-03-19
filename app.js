const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const app = express();
const passportsetup = require('./config/passport-setup');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

// connectivity with database
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });


// set up body parser


app.use(cookieSession({
    maxAge: 24 *60 *60 *1000,
    keys : [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// set up view engine
app.set('view engine','ejs');


//set up routes
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);


// create home routes
app.get('/',(req,res)=>{
    res.render("home");
});


app.listen(3002,()=>{
    console.log('app now listening for requests on port 3002');
})

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    console.log("serialiszs",user.id)
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    console.log("deserializeUser")
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        // passport callback function
        console.log("Passport callback function fired");
        console.log(profile);
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                // already have a user
                console.log('user is',currentUser);
                 done(null,currentUser);
            }else{
                // if not , create new user
                new User({
                    username : profile.displayName,
                    googleId : profile.id
                }).save().then((User)=>{
                    console.log('new user created',User);
                    done(null,User);
                });
            }
        })
        
    })
);
 
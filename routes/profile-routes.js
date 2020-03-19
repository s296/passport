const router = require('express').Router();

const autoCheck = (req,res,next)=> {
    console.log("function called",req.User)
    if(!req.user){
        console.log("not user")
        // if user is not logged in
        res.redirect('/auth/login');  
    }else{
        console.log("else case")
        // if user is logged in
        next();
    }
};


router.get('/',autoCheck,(req,res)=>{
    res.send('you are  logged in ,this is your profile-'+ req.user.username);
});

module.exports = router;
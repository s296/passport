const mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
    username: String,
    googleId:String
});


const userdb = mongoose.model('google', userSchema);
module.exports = userdb;

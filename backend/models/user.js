// import mongoose module
const mongoose = require("mongoose"); 
//import mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');
// create match schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String, 
    email: {type : String, unique : true},
    pwd: String,
    role : String,
    avatar:String //File Path
});  
// Application du validateur Unique Validateur au schema du model user 
userSchema.plugin(uniqueValidator);
// Affect matchSchema to Match Model Name
const user = mongoose.model("User", userSchema); 

// exports match
module.exports = user; 

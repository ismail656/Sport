// import mongoose module
const mongoose = require("mongoose"); 

// create match schema
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number, 
    teamOne: String,
    teamTwo: String,
}); 

// Affect matchSchema to Match Model Name
const match = mongoose.model("Match", matchSchema); 

// exports match
module.exports = match; 

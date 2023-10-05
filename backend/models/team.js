// import mongoose module
const mongoose = require("mongoose"); 

// create match schema
const teamSchema = mongoose.Schema({
    foundation: Number,
    name: String,
    stadium: String,
    owner: String,
    players : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Player"
        }
    ]
}); 

// Affect matchSchema to Match Model Name
const team = mongoose.model("Team", teamSchema); 

// exports match
module.exports = team; 
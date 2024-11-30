// import mongoose module
const mongoose = require("mongoose"); 

// create match schema
const playerSchema = mongoose.Schema({
    age: Number,
    nbr: Number, 
    name: String,
    position: String,
    teamId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Team"
    },
}); 

// Affect matchSchema to Match Model Name
const player = mongoose.model("Player", playerSchema); 

// exports match
module.exports = player; 
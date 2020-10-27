const mongoose = require('mongoose');

const favorite = mongoose.Schema({
    userFrom : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    movieId : {
        type:"String"
    },
    movieTitle : {
        type :"String"
    },
    moviePost : {
        type: "String"
    },
    movieRunTime : {
        type: "String"
    }
    
},{timeStamps : true})



const Favorite = mongoose.model('Favorite', favorite);

module.exports = { Favorite }
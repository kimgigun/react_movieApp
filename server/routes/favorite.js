const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", (req, res) => {

    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info) =>{
        if(err)return res.status(400).send(err)

        res.status(200).json({success:true, favoriteNumber :info.length})
    })

});


router.post("/favorited", (req, res) => {

    Favorite.find({"movieId":req.body.movieId, "useFrom" : req.body.userFrom})
    .exec((err, info) =>{
        if(err)return res.status(400).send(err)

        res.status(200).json({success:true, favorited :info.length})
    })

});

router.post("/addToFavorite", (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err)return res.status(400).send(err)
        res.status(200).json({success:true})
    })
 

});

router.post("/removeToFavorite", (req, res) => {

    Favorite.findOneAndDelete({'movieId': req.body.movieId, 'userFrom': req.body.userFrom})
    .exec((err, info) =>{
        if(err)return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
 

});

router.get("/getFavoriteList", (req, res) =>{

    Favorite.find({'userFrom':req.body.userFrom})
    .exec((err, list)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, list:list})
    })
})




module.exports = router;

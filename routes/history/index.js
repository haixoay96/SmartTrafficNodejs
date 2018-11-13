const express = require('express');
const router = express.Router();
const Location = require('../../models').Location;
const mongoose = require('mongoose');
router.post('/',async (req, res)=>{
    let username = req.body.username;
    try{
        let date = new Date();
        
        let from = date.getFullYear() + '/' + (1 + date.getMonth()) + '/' + date.getDate();
        from = new Date(from)
       // from = Math.floor((new Date(from))/1000).toString(16) + "0000000000000000" 
        date.setDate(date.getDate()+1)
        let to = date.getFullYear() + '/' + (1 + date.getMonth())+ '/' + date.getDate()
        to = new Date(to)
       // to = Math.floor((new Date(to))/1000).toString(16) + "0000000000000000" 

        let result = await Location.find({
            username: username,
            date_created:{
                '$gt': from,
                '$lt': to
            }

        })
        console.log(result)
        
        res.json({
            status:1000,
            historys:result
        })
    }catch(e){
        res.json({
            status:10001
        })
        console.log(e)
    }

})

module.exports = router
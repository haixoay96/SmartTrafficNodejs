const express = require('express');
const router = express.Router()
const Density = require('../../models').Density;
const mongoose = require('mongoose');

router.get('/', (req, res)=>{
    res.send('hello')
})
router.post('/', async(req,res)=>{
    let year = req.body.year;
    let month = req.body.month;
    let date = req.body.date;
    let hour = req.body.hour;
    let minute = req.body.minute;

    // increa = new Date(year,month, date, hour, minute);
    // increa.setMinutes(increa.getMinutes()+1)
    // year = increa.getFullYear();
    // month = increa.getMonth();
    // date = increa.getDate();
    // hour = increa.getHours();
    // minute = increa.getMinutes();
    let time = year + '/' + (month+1) + '/' + date + '/' + hour + ':' + minute;
    time = Math.floor((new Date(time))/1000).toString(16) + "0000000000000000";
    try{
        let result = await Density.find({
            _id:{
                '$lt': mongoose.Types.ObjectId(time)
            }
        }).sort({_id:-1}).limit(1);
        if(result.length <=0){
            res.json({
                status:1002
            });
            return;
        }
        res.json({
            status:1000,
            squares: result[0].list
        });
    }catch(e){
        console.log(e)
        res.json({
            status:1001,
        })
    }
   
})

module.exports = router;
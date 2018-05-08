const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Location = require('../../models').Location;
const Density = require('../../models').Density;
const Config = require('../../config');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
//
function isOnBox(box, point){
    //get box
    let topLeft = box.topLeft;
    let topRight = box.topRight;
    let bottomRight = box.bottomRight;
    let bottomLeft = box.bottomLeft;
    //get edage
    let top =  topLeft.latitude;
    let bottom = bottomRight.latitude;

    let left = topLeft.longitude;
    let right = bottomRight.longitude;

    if( point.latitude <= top && point.latitude >= bottom && point.longitude >= left && point.longitude <= right ){
      return true;
    }
    return false;
  }
router.get('/gen', async(req, res)=>{
    let data = []
    for(let i = 0 ; i<=1000; i++){
        data.push({
            longitude: Config.topLeft.longitude + Math.random()*(Config.topRight.longitude - Config.topLeft.longitude),
            latitude:Config.bottomLeft.latitude +  Math.random()*(Config.topLeft.latitude - Config.bottomLeft.latitude),
            speed:5 + Math.random()*40,
            heading:0.3,
            username: 'Duclinh'
        });
    }
    Location.insertMany(data);
    res.send('a')
})
router.get('/', async(req,res)=>{
    let year = req.body.year;
    let month = req.body.month;
    let date = req.body.date;
    let hour = req.body.hour;
    let minute = req.body.minute;
   
    try{
        let result = await Density.find().sort({_id:-1}).limit(1);
        res.json({
            status:1000,
            squares: result[0].list
        });
    }catch(e){
        res.json({
            status:1001,
        })
    }
   
})
router.post('/', async(req, res)=>{
    console.log(req.body);
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let username = req.body.username;
    let speed = req.body.speed;
    let heading = req.body.heading;
    try{
        let insert = await Location.create({
            longitude: longitude,
            latitude: latitude,
            username:username,
            speed: speed,
            heading:heading
        });
        console.log(insert);
        res.json({
            status:1000
        })
    }catch(e){
        res.json(e)
        console.error(e)
    }
})

module.exports = router;

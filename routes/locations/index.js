const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Location = require('../../models').Location
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
router.get('/', async(req,res)=>{
    // let data = []
    // for(let i = 0 ; i<=100000; i++){
    //     data.push({
    //         longitude: Config.topLeft.longitude + Math.random()*(Config.topRight.longitude - Config.topLeft.longitude),
    //         latitude:Config.bottomLeft.latitude +  Math.random()*(Config.topLeft.latitude - Config.bottomLeft.latitude),
    //         speed:1,
    //         heading:0.3,
    //         date: new Date()
    //     });
    // }
   // Location.insertMany(data);
    try{
        let find = await Location.find({});
        find = find.map((value)=>{
            return {
                longitude:value.longitude,
                latitude:value.latitude,
                date:value._id.getTimestamp()
            }
        })
        let squares = Config.getSquares();
        squares = squares.map((value, index)=>{
            let count = 0;
            let i = 0;
            let length = find.length;
            for ( i = 0 ; i <length ; i++){
                if(isOnBox(value, find[i]) === true){
                    count++;
                }
            }
            value.count = count;
            return value;
        });
        res.json({
            status:1000,
            squares: squares
        })

    }catch(e){
        res.json(e);

    }
})
router.post('/', async(req, res)=>{
    console.log(req.body);
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    try{
        let insert = await Location.create({
            longitude: longitude,
            latitude: latitude
        });
        console.log(e);
        res.json({
            status:1000
        })
    }catch(e){
        res.json(e)
    }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Location = require('../../models').Location

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
//

router.get('/', async(req,res)=>{
    let data = []
    for(let i = 0 ; i<=1000; i++){
        data.push({
            longitude: 105.7260039 + Math.random()*0.1 - 0.05,
            latitude:21.1096719 +  Math.random()*0.1 - 0.05
        }) ;
    }
    Location.insertMany(data);
    try{
        let find = await Location.find({});
        find = find.map((value)=>{
            return {
                longitude:value.longitude,
                latitude:value.latitude,
                date:value._id.getTimestamp()
            }
        })
        console.log(find);
        res.json({
            status:1000,
            locations: find
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

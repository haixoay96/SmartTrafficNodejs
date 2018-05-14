const express = require('express');
const router = express.Router();
const User = require('../../models').User;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
//

router.get('/', async(req,res)=>{
    try{
        let result = await User.find();
        console.log(result)
        if(result){
            res.json({
                status:1000,
                users: result
            })
        }else{
            res.json({
                status:10001
            })
        }
    }catch(e){
        res.json({
            status:10002
        })
    }

})


module.exports = router;
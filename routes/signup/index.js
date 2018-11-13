const express = require('express');
const router = express.Router();
const User = require('../../models').User;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
//

router.post('/', async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);
    try{
        let result = await User.create({
            username:username,
            password:password,
            permission:'member',
            date_created: new Date()
        });
        res.json({
            status:1000
        });
    }catch(e){
        console.error(e);
        res.json({
            status:1001
        })
    }

})


module.exports = router;
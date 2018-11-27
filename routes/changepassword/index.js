const express = require('express');
const router = express.Router();
const User = require('../../models').User;



router.post('/', async(req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let new_password = req.body.new_password;
    console.log(req.body)
    try{
        let result = await User.findOneAndUpdate({
            username:username,
            password: password
        },{
            $set:{
                password: new_password
            }
        });
        console.log(result);
        if(!result){
            res.json({
                status:1001
            })
        }
        res.json({
            status:1000
        });
    }catch(e){
        console.log(e);
        res.json({
            status:1001
        })
    }
});
module.exports = router;
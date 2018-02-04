const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
//
router.post('/location', (req, res)=>{
    console.log(req.body);
})

module.exports = router;

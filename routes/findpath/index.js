const express = require('express');
const router = express.Router();
const Graph = require('./Graph');
const Location = require('../../models').Location;
const Density = require('../../models').Density;
const Config = require('../../config');
router.get('/:from/:to', async(req, res)=>{
    try{
        let result = await Density.find().sort({_id:-1}).limit(1);
        var map = {a:{b:0.1,c:1},b:{a:2,c:1},c:{a:4,b:1}};
        result[0].list.forEach((item, index) => {
            map[''+index] = {};
            let check1 = (index - 30) >=0;
            let check3 = (index+1)%30 != 0;
            let check2 = check1 && check3;
            let check5 = (index + 30) <=901;
            let check4 = check3 && check5;
            let check7 = (index%30) != 0;
            let check6 = check5 && check7;
            let check8 = check7 && check1; 
            if(check1){
                map[''+index][''+(index-30)] = result[0].list[index-30];
            }
            if(check2){
                map[''+index][''+(index-29)] = result[0].list[index-29];
            }
            if(check3){
                map[''+index][''+(index+1)] =  result[0].list[index+1];
            }
            if(check4){
                map[''+index][''+(index+31)] = result[0].list[index+31];
            }
            if(check5){
                map[''+index][''+(index+30)] = result[0].list[index+30];
            }
            if(check6){
                map[''+index][''+(index+29)] = result[0].list[index+29];
            }
            if(check7){
                map[''+index][''+(index-1)] = result[0].list[index-1];
            }
            if(check8){
                map[''+index][''+(index-31)] = result[0].list[index-31];
            }
            
        });
        let graph = new Graph(map);
        let paths = graph.findShortestPath(req.params.from, req.params.to);
        res.json({
            status:1000,
            paths: paths
        });
    }catch(e){
        res.json({
            status:1001,
        })
    }
})

module.exports = router;
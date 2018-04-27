
const mongoose = require('mongoose');
const Location = require('./models').Location;
const Density = require('./models').Density;
const Config = require('./config');
const fs = require('fs');
mongoose.connect('mongodb://localhost:27017/test');


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
 
function calculate(){
    return new Promise(async(resolve, reject)=>{
        let find = await Location.find({});
        console.log(find)
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
        resolve(squares)
    });
}


setInterval(async()=>{
    console.log('start')
    let squares = await calculate();
    try{
        let result = await Density.create({
            list: squares
        })
        console.log('successfull!');
    }catch(e){
        console.log(e);
    }
}, 10000)



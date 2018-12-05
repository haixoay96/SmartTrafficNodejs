
const mongoose = require('mongoose');
const Location = require('./models').Location;
const Density = require('./models').Density;
const Config = require('./config');
const fs = require('fs');
mongoose.connect('mongodb://duclinh:duclinh123@ds261253.mlab.com:61253/khoaluan', (error)=>{
  if(error){
    console.error('Mongo connect error!', error);
    return;
  }
  console.log('Mongo connect successful!');
});

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
   // console.log('faalse')
    return false;
}
 
function calculate(){
    console.log('tinh')
    return new Promise(async(resolve, reject)=>{
        let date = new Date();
        date.setMinutes(date.getMinutes()-5)
        //let time = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getHours() + ':' + date.getMinutes();
        //time = Math.floor((new Date(time))/1000).toString(16) + "0000000000000000";
        try{
            let find = await Location.find({
                date_created:{
                    '$gte':date
                }
            });
            find = find.map((value)=>{
                return {
                    longitude:value.longitude,
                    latitude:value.latitude,
                    date:value._id.getTimestamp(),
                    speed: value.speed
                }
            })
            let squares = Config.getSquares();
            squares = squares.map((value, index)=>{
                let count = 0;
                let speed = 0;
                let i = 0;
                let length = find.length;
                for ( i = 0 ; i <length ; i++){
                    if(isOnBox(value, find[i]) === true){
                        count++;
                        if(find[i].speed !== -1){
                            speed= speed + find[i].speed
                        }
                    }
                }
                value.count = count;
                if(count !== 0){
                    value.speed = speed/count;
                }else{
                    value.speed = 0;
                }
                return value;
            });
            resolve(squares)
        }catch(e){
            reject(e)
        }
    });
}

(async ()=>{
    let squares = await calculate();
    try{
        let result = await Density.create({
            list: squares,
            date_created: new Date()
        })
        console.log('successfull!');
    }catch(e){
        console.log('loi',e);
    }
})();


setInterval(async()=>{
    console.log('start')
    let squares = await calculate();
    try{
        let result = await Density.create({
            list: squares,
            date_created: new Date()
        })
        console.log('successfull!');
    }catch(e){
        console.log('loi',e);
    }
}, 1000*60*5);



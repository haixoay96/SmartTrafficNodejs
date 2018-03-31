
function divideSquares(){
    let point = {
        latitude:21.157200,
        longitude:105.456390
    };
    let squares = [];
    let unitLat = (21.157200 - 20.951180)/23.0;
    let unitLng = (105.951180 - 105.456390)/56.0;
    for ( let i = 0 ; i< 23; i++){
        for ( let j = 0 ; j < 56 ;j++){
            let topLeft = {
                longitude:point.longitude + unitLng*j,
                latitude:point.latitude - unitLat*i
            };
            let topRight = {
                longitude: topLeft.longitude + unitLng,
                latitude: topLeft.latitude
            };
            let bottomRight = {
                longitude: topRight.longitude,
                latitude: topRight.latitude - unitLat
            };
            let bottomLeft = {
                longitude: bottomRight.longitude - unitLng,
                latitude:bottomRight.latitude
            }
            squares.push({
                topLeft: topLeft,
                topRight:topRight,
                bottomRight:bottomRight,
                bottomLeft:bottomLeft,
            });      
        }
    }
    return JSON.stringify(squares);
        
}
let squares = divideSquares();
module.exports = {
    deltaLatitude: 21.157200 - 20.951180,
    deltaLongitude: 105.951180 - 105.456390,
    topLeft:{
        latitude:21.157200,
        longitude:105.456390
    },
    topRight:{
        latitude:21.157200,
        longitude:105.951180
    },
    bottomLeft:{
        latitude:20.951180,
        longitude:105.456390
    },
    bottomRight:{
        latitude:20.951180,
        longitude:105.951180
    },
    getSquares: function (){
        return JSON.parse(squares);
    }
}
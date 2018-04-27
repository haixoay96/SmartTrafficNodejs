
function divideSquares(){
    let point = {
        latitude:21.13032783,
        longitude:105.7567982
    };
    let squares = [];
    let unitLat = (21.13032783 - 20.951180)/30.0;
    let unitLng = (105.9335089 - 105.7567982)/30.0;
    for ( let i = 0 ; i< 30; i++){
        for ( let j = 0 ; j < 30 ;j++){
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
    deltaLatitude: 21.13032783 - 20.951180,
    deltaLongitude: 105.9335089 - 105.7567982,
    topLeft:{
        latitude:21.13032783,
        longitude:105.7567982
    },
    topRight:{
        latitude:21.13032783,
        longitude:105.9335089
    },
    bottomLeft:{
        latitude:20.951180,
        longitude:105.7567982
    },
    bottomRight:{
        latitude:20.951180,
        longitude:105.9335089
    },
    getSquares: function (){
        return JSON.parse(squares);
    }
}
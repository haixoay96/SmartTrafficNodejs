const mongoose = require('mongoose');
var Location = mongoose.Schema({
    longitude: {
        type: Number,
        required:true
    },
    latitude: {
        type:Number,
        required: true
    },
    speed: {
        type:Number,
        required: true
    },
    heading:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    
});

module.exports = mongoose.model('Location', Location);
  
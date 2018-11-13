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
    username: {
        type: String,
        require:true
    },
    date_created: {
        type: Date,
        required:true
    }
    
});

module.exports = mongoose.model('Location', Location);
  
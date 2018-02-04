const mongoose = require('mongoose');
var Location = mongoose.Schema({
    longitude: {
        type: Number,
        required:true
    },
    latitude: {
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Kitten', Location);
  
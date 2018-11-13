const mongoose = require('mongoose');
var Density = mongoose.Schema({
    list: {
        type: Array,
        required:true
    },
    date_created: {
        type: Date,
        required:true
    }
});

module.exports = mongoose.model('Density', Density);
  
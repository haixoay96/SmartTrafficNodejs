const mongoose = require('mongoose');
var Density = mongoose.Schema({
    list: {
        type: Array,
        required:true
    }
});

module.exports = mongoose.model('Density', Density);
  
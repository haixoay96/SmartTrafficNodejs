const mongoose = require('mongoose');
var Location = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type:String, // 'member || admin'
        required:true
    },
    date_created:{
        type: Date,
        required:true
    }
});

module.exports = mongoose.model('User', Location);
  
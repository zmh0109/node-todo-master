var mongoose = require('mongoose');

module.exports = mongoose.model('food', {
    text: {
        type: String,
        default: ''
    },

    price:{
        type:Number,
        default: 0
    }
});
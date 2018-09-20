
const mongoose = require('mongoose');

var Quote = mongoose.model('Quote', new mongoose.Schema({
    writer : {type:String, required: true},
    content : {type: String, required: true}
}, {timestamps: true}));

module.exports = Quote;
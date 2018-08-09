
const mongoose = require('mongoose'),
    Quote = mongoose.model('Quote'),
    quotes = require('./server/controllers/quotes.js')

module.exports = function(app){
    app.get('/', function(req, res) {
        quotes.index(req, res);
    });

    app.get('/showAll', function(req, res) {
        quotes.showAll(req, res);
    });

    app.post('/newQuote', function(req, res) {
        quotes.newQuote(req, res);
    });
};


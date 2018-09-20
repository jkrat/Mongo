
const quotes = require('./server/controllers/quotes.js')

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

    app.listen(8000, function() {
        console.log("listening on port 8000");
      })
};


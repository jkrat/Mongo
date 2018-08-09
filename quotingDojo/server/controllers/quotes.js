
module.exports = {
    index: function(req, res) {
    	res.render('index.ejs');
    },
    showAll: function(req, res) {
    	var quotes = Quote.find({}, (err, quotes) => {
            if(err) console.log("error");
            else console.log(quotes);
            return res.render('quotes.ejs', {quotes: quotes});
        })
    },
    newQuote: function(req, res) {
        var quote = new Quote({
            writer: req.body.writer,
            content: req.body.content
        });
        quote.save( (err) => {
            if(err) console.log(err);    
            else console.log('success');    
            res.redirect("/showAll");
        })
    }
};
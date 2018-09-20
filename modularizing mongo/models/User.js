
let mongoose = 

class User {
    constructor() {
        this.email = {
            type:String,
            required:true
        };

        this.password = {
            type:String,
            required:true
        }
    }
}

mongoose.model("User", new User());


// or
mongoose.model("User", new mongoose.Schema)

var User = mongoose.model("User");






// ---------- returning JSON ----------
// Models
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
	quote: {type: String, required: true, minlength:10},
	author: {type: String, required: true},
    }, {timestamps: true })
mongoose.model('Quote', QuoteSchema); 

// Routes 
var QuoteController = require("../controllers/QuoteController.js")

module.experts = function(app) {
    app.get('/quotes', QuoteController.showQuotes),
    app.post('/quotes', QuoteController.createQuote)
}

// Controllers
let Quote = req("mongoose").model("Quote");
class QuoteController{
    createQuote(req, res) {
        let quote = newQuote (req.body);
        quote.save(err=> {
            if(err) {
                return res.JSON(err);
            } else {
                return res.JSON(quote);
            }
        }
    showQuote(req, res) {
        var quote = Quote.find({}, (err, quote) =>{
        if(err) {
            return res.JSON(err);
        } else {
            return res.JSON(quote);
        }
    });
}



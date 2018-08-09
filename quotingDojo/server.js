var express = require("express");
var app = express();
let port = 8000;

var bodyParser = require('body-parser');
var session = require('express-session')
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "dortmund",
    resave: false,
    saveUniitialze:true,
    cookie:{maxAge:6000000}
}));
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/userQuotes', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var QuoteSchema = new mongoose.Schema({
    writer : {type:String, required: true},
    content : {type: String, required: true}
}, {timestamps: true});

var Quote = mongoose.model('Quotes', QuoteSchema);

// ----------- routes ------------------

require('./server/config/routes.js')(app)

// ---------------------------

app.listen(port, function() {
    console.log("listening on port 8000");
  })
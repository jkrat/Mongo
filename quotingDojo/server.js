var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session')

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
 
// ----------- requirements ------------------

require('./server/config/routes.js')(app);
require('./server/config/mongoose.js');

// ---------------------------


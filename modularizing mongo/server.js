let express = require("express");
let app = express();
let port = 8000;

let bodyParser = require('body-parser');
let session = require('express-session');
let mongoose = require("mongoose");

app.use(session({
    secret: "dortmund",
    resave: false,
    saveUniitialze:true,
    cookie:{maxAge:1377777777}
}));

app.use(bodyparser.urlencoded({
    extended:true;
}))

app.use(flash());

require("./config/mongoose.js");
require("./config/routes.js")(app);

app.listen(port, ()=>{
    console.log("serber is running on port: ", port)
})
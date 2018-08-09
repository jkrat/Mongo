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

// -----------------------

mongoose.connect('mongodb://localhost:27017/messageBoard', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var CommentSchema = new mongoose.Schema({
    name : {type:String, required:[true, "name required"]},
    content : {type: String, required:[true, "comment required"]}
}, {timestamp:true});

var MessageSchema = new mongoose.Schema({
    name : {type:String, required:[true, "name required"]},
    content : {type: String, required:[true, "message required"], minlength:[3, "message must be 3 characters"]},
    comments: [CommentSchema]
}, {timestamp:true});

var Comment = mongoose.model('Comments', CommentSchema);    
var Message = mongoose.model('Messages', MessageSchema);

// -----------------------

app.get('/', function(req, res) {
    Message.find({}).sort({'_id': -1}).exec((err, messages) => {
        if (err) console.log(err);
        else console.log("success");
        return res.render('index', {messages: messages});
    })
});

app.post("/newMessage", function(req, res) {
    var message = new Message(req.body);
    message.save( (err) => {
        if(err) console.log(err);    
        else console.log("success");    
        res.redirect('/');
    })
});

app.post("/newComment/:id", function(req, res) {
    var comment = new Comment(req.body);
    comment.save( (err) => {
        if(err) console.log(err); 
        else {
            Message.findOne({_id: req.params.id}, (err, message) => {
                message.comments.push(comment);
                message.save(function(err){
                    if(err) console.log(err);    
                    else console.log("success");    
                })
            })
        }
        res.redirect('/');
    })
});

// ---------------------------

app.listen(port, function() {
    console.log("listening on port 8000");
  })

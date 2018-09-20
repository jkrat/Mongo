var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));

mongoose.connect('mongodb://localhost:27017/basic_mongoose', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');



app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
     User.find({}, (err, users) => {
        if(err){
            console.log("error");
        } else {
            console.log(users);
            res.render('index.ejs', {users: users});
        }
     })
});

app.post('/users', function(req, res) {
  console.log("POST DATA \n\n", req.body);
  var user = new User({
      name: req.body.name,
      age: req.body.age
    });
  user.save(function(err){
      if(err){
          console.log("error");
      } else {
          console.log('success');
          res.redirect("/");
      }
  })
});


app.listen(8000, function() {
  console.log("listening on port 8000");
})
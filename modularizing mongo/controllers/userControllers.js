let User = require("mongoose").model("User");

class UserController{

    createUser(req, res){

        return res.render("../views/register.ejs");
    }

    register(req, res){
        let user = new User(req.body);

        user.save(e=>{
            if(e){
                res.flash('userErrors', user.errors);
                return res.redirect('/register');
            } else {
                req.session.user = user._id;
                return res.redirect('/register');
            } 
                
        });
    }

}


module.exports = new UserController();
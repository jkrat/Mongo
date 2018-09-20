let UserController = require("../controllers/UserController.js");

module.exports = function(app){
    app.get("/register", UserController.createUser);
    app.post("/register", UserController.register);
};
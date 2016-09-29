var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./app/config.js");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressJwt  = require('express-jwt');
var  verifyToken  = expressJwt({secret : config.secret});
var cors = require('cors');

var postsController = require("./app/controllers/posts.js");
var usersController = require("./app/controllers/users.js");
var authController = require("./app/controllers/auth.js");

app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(config.database);
var router = express.Router();
router.use(function(req,res,next){
    console.log("Something is hapenning");
    next();
});

router.get('/',function(req,res){
    res.json({message : "Yeah !!! :)"});
});


router.route("/login").post(authController.authenticate);

router.route("/users")
.post(usersController.postUsers)
.get(usersController.getUsers);

router.route("/user")
.get(verifyToken,usersController.getUser);


router.route("/posts")
.post(verifyToken,postsController.postposts)
.get(postsController.getPostsByPage);

router.route("/posts/:post_id")
.get(postsController.getPost);


app.use('/api',router);
var port     = process.env.PORT || 8888; 
app.listen(port);
console.log("App listening to port : " + port);






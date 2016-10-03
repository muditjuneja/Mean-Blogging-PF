var User = require("../models/user.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var config = require("../config.js");
exports.authenticate = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    console.log(user);
    if (err)
      throw err;
    if (!user) {
      res.status(404);
      return res.json({
        success: false,
        message: "Invalid credentials"
      });
    }
    else if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (err) throw err
        if (isMatch) {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 14440
          });
          res.status(200);
          return res.json({
            success: true,
            token: token,
            user: user
          });
        }
        else {
          res.status(404);
          return res.json({
            success: false,
            message: "Invalid credentials"
          });
        }

      });

    }
  });
};
var User = require("../models/user.js");
exports.postUsers = function(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    console.log(user);
    user.save(function(err) {
        if (err) {
console.log(err);
            res.status(400);
            return res.send(err);
        }
        res.status(200);
        res.json("User created");
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            return res.send(err);
        res.status(200);
        return res.json(users);
    });
};

exports.getUser = function(req, res) {
    res.status(200);
    return res.json(req.user);
};

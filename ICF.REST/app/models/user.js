var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

});
userSchema.pre('save', function(callback) {
    var user = this;
    bcrypt.genSalt(5, function(err, salt) {
        if (err)
            return callback(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

module.exports = mongoose.model("User", userSchema);
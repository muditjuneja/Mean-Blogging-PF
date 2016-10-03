var Post = require("../models/post.js");
exports.postposts = function(req, res) {
    var post = new Post({
        content: req.body.content,
        title: req.body.title,
        user: req.user._doc._id,
        type: req.body.type
    });
    console.log(post);

    post.save(function(err) {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        console.log(post);
        res.status(200);
        return res.json({
            message: "Post Created"
        });
    });
};
exports.getPosts = function(req, res) {
    Post.find().populate('user').exec(function(err, posts) {
        if (err)
            return res.send(err);
        res.status(200);
        return res.json(posts);
    });

};

exports.getPostsByPage = function(req, res) {
    var page = req.query.page;
    Post.find().populate('user').sort({
        date: -1
    }).skip((page - 1) * 5).limit(5).exec(function(err, posts) {
        if (err)
            return res.send(err);
        res.status(200);
        return res.json(posts);
    });

};

exports.getPost = function(req, res) {
    Post.findById(req.params.post_id).populate('user').exec(function(err, post) {
        if (err)
            return res.send(err);
        res.status(200);
        return res.json(post);
    });

};
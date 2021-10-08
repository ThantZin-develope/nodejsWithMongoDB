const db = require('../models/index.js');
const Post = db.posts;
const Comment = db.comments;
const response = require('../utils/api.response.js');

exports.create = (req, res) => {

    var comment = new Comment({
        text: req.body.text,
        post: req.body.post
    });

    comment.save(comment).then(data => {
        return response.successResponse(res, 201, data);
    }).catch(error => {
        return response.errResponse(res, 500, error.message);
    })

};

exports.findById = (req, res) => {
    let id = req.params.id;

    Comment.findById(id, (err, resultData) => {
        if (err) {
            return response.errResponse(res, 404, err.message);
        } else {
            return response.successResponse(res, 200, resultData);
        }
    }).populate('post');
}
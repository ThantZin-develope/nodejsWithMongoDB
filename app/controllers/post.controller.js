const db = require('../models/index.js');
const Post = db.posts;
const response = require('../utils/api.response.js');

exports.create = (req, res) => {
    const post = new Post({
        text: req.body.text
    });

    post.save(post).then(resultData => {
        return response.successResponse(res, 201, resultData);
    }).catch(error => {
        return response.errResponse(res, 500, error.message);
    })
};

exports.updateById = (req, res) => {
    let id = req.params.id;
    Post.findByIdAndUpdate(id, { text: req.body.text }, { returnOriginal: false }, (err, resultData) => {
        if (err) {
            return response.errResponse(res, 500, err.message);
        } else {
            return response.successResponse(res, 200, resultData);
        }
    });
};

exports.findById = (req, res) => {
    let id = req.params.id;
    Post.findById(id, (err, resultData) => {
        if (err) {
            return response.errResponse(res, 404, err.message);
        } else {
            return response.successResponse(res, 200, resultData);
        }
    }).populate('reactions');
}


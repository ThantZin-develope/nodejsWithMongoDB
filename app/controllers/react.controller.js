const db = require('../models/index.js');
const Post = db.posts;
const Reaction = db.reactions;
const response = require('../utils/api.response.js');

exports.create = (req, res) => {
    let tutoId = req.query.tutoId;

    var reaction = new Reaction({
        type: req.body.type
    });

    reaction.save(reaction).then(result => {

        Post.findByIdAndUpdate(tutoId, {
            $push: {
                reactions: result._id
            }
        }, { returnOriginal: false }, (err, responseResult) => {
            if (err) {
                return response.errResponse(res, 500, err.message);
            } else {
                return response.successResponse(res, 201, responseResult);
            }
        })
    }).catch(error => {

        return response.errResponse(res, 500, error.message);
    });
};

exports.updateById = (req, res) => {
    let id = req.params.id;

    Reaction.findByIdAndUpdate(id, { type: req.body.type }, { returnOriginal: false }, (err, resultData) => {
        if (err) {
            return response.errResponse(res, 404, err.message);
        } else {
            return response.successResponse(res, 200, resultData);
        }
    })
}
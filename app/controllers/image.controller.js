const db = require('../models/index.js');
const Image = db.images;
const response = require('../utils/api.response.js');
const Post = db.posts;

exports.create = (req, res) => {
    let tutorialId = req.query.tutoId;
    let image = new Image({
        url: req.body.url
    });

    image.save(image).then(data => {
        Post.findByIdAndUpdate(tutorialId, {
            $push: {
                images: {
                    url: data.url
                }
            }
        },
            { returnOriginal: false },

            (err, resultData) => {
                if (err) {
                    return response.errResponse(res, 500, err.message);
                } else {
                    return response.successResponse(res, 201, resultData);
                }
            }
        )
    }).catch(error => {
        return response.errResponse(res, 500, error.message);
    })


};


exports.updateById = (req, res) => {
    let id = req.params.id;
    Image.findByIdAndUpdate(id, { url: req.body.url }, { returnOriginal: false }, (err, resultData) => {
        if (err) {
            return response.errResponse(res, 500, err.message);
        } else {
            return response.successResponse(res, 200, resultData);
        }
    });
}
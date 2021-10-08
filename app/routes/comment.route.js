module.exports = (router) => {
    let commentController = require('../controllers/comment.controller.js');

    router.post('/comment/create', commentController.create);

    router.get('/comment/findById/:id', commentController.findById);
}
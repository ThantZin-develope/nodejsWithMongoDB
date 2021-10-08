module.exports = router => {
    const postController = require('../controllers/post.controller.js');

    router.post('/post/create', postController.create);

    router.put('/post/update/:id', postController.updateById);

    router.get('/post/findById/:id', postController.findById);
}
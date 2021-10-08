module.exports = router => {
    const imageController = require('../controllers/image.controller.js');

    router.post('/image/upload', imageController.create);

    router.put('/image/update/:id', imageController.updateById);
}
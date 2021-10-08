module.exports = (router) => {
    const reactionController = require('../controllers/react.controller.js');

    router.post('/react/create', reactionController.create);

    router.put('/react/update/:id', reactionController.updateById);
}
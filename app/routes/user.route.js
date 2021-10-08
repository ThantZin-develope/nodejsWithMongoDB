module.exports = router => {
    const userController = require('../controllers/user.controller.js');

    router.post('/user/create', userController.create);

    router.get('/user/all', userController.findAll);

    router.put('/user/update/:id', userController.updateById);

    router.get('/user/downloadxlsx', userController.downloadExcel);

    router.post('/user/sendmail', userController.sendmail);

}
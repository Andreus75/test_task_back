const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
// const userValidator = require('../validators/user.validator');
const userController = require('../controllers/user.controller');

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.isUserNameTrue,
    userController.createUser
);

router.get('/', userController.getUsers);

module.exports = router;

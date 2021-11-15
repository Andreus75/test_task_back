const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userValidator = require('../validators/user.validator');
const userController = require('../controllers/user.controller');

router.post(
    '/',
    userMiddleware.isUserBodyValid(userValidator.createUserValidator),
    userMiddleware.isUserNameTrue,
    userController.createUser
);

router.get('/', userController.getUsers);

router.get('/:user_id', userMiddleware.findUserById, userController.getUserById);

router.put(
    '/:user_id',
    userMiddleware.isUserBodyValid(userValidator.updateUserValidator),
    userMiddleware.findUserById,
    userController.updateUserById
);

router.delete('/:user_id', userMiddleware.findUserById, userController.deleteUserById);

module.exports = router;

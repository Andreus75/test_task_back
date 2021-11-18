const passwordService = require('../services/password.service');
const User = require('../dataBase/User');
const { SuccessCreated } = require('../configs/error-enum');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const { first_name, last_name } = req.body;

            const userUpdate = await User.findByIdAndUpdate({_id: user_id}, { first_name, last_name }, {new: true});

            res.status(SuccessCreated).json(userUpdate);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const user = req.user;

            await User.deleteOne(user);

            res.json('User was delete successfully');
        } catch (e) {
            next(e);
        }
    }
};

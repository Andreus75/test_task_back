const {
    ClientErrorBadRequest,
    ClientErrorNotFound,
    USER_ALREADY_EXIST,
    USER_WITH_THIS_ID_IS_MISSING
} = require('../configs/error-enum');

const User = require('../dataBase/User');

module.exports = {
    isUserBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            req.body = value;

            if (error) {
                return next({
                    message: new Error(error.details[0].message),
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNameTrue: async (req, res, next) => {
        try {
            const { username } = req.body;

            const user = await User.findOne({ username });

            if (user) {
                return next({
                    message: USER_ALREADY_EXIST,
                    status: ClientErrorNotFound
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    findUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userFindById = await User.findById({_id: user_id});

            if (!userFindById) {
                return next({
                    message: USER_WITH_THIS_ID_IS_MISSING,
                    status: ClientErrorNotFound
                });
            }

            req.user = userFindById;

            next();
        } catch (e) {
            next(e);
        }
    }
};

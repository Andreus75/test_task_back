const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { EMAIL_OR_PASSWORD_IS_WRONG, ClientErrorNotFound } = require('../configs/error-enum');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            return new ErrorHandler(EMAIL_OR_PASSWORD_IS_WRONG, ClientErrorNotFound);
        }
    }
};

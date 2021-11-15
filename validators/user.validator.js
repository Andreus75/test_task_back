const Joi = require('joi');

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user_role_enum');

const createUserValidator = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    first_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    last_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .required(),
    user_type: Joi.string().allow(...Object.values(userRoles)),
});

module.exports = { createUserValidator };

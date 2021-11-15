const { Schema, model } = require('mongoose');

const { userRoleEnum } = require('../configs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unambiguous: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        select: false
    },
    user_type: {
        type: String,
        default: userRoleEnum.DRIVER,
        required: true,
        enum: Object.values(userRoleEnum)
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('user', userSchema);



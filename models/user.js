const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    phone: {
        type:String,
        required: true
    },
    password: {
        type:String,
        minlength: 5,
        maxlength: 18,
        required: true
    }
});

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(50).required().email,
        phone: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(18).required(),
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;
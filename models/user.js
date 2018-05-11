const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

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
        maxlength: 2000
    },
    phone: {
        type:String,
        required: true
    },
    password: {
        type:String,
        minlength: 5,
        maxlength: 2028,
        required: true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(2002).required().email(),
        phone: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(2028).required(),
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;
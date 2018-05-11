const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const config = require('config');

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('invalid email or password.');

    const token = user.generateAuthToken();
   

    res.send(token); 
});

function validate(user) {
    const schema = {
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(1).max(2028).required()
    };
    return Joi.validate(user,schema);
}

module.exports = router;
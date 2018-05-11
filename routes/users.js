const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middlewares/auth');


router.get("/me", auth, async (req, res) => {

    const users = await User.findById(req.user._id).select('-password');
    res.send(users);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User(_.pick(req.body, ['name','email','phone','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    if(!user) return res.status(404).send('Invalid given ID which is not found');
    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.put("/:id", async (req, res) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    const result = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    },{ new: true});

    if(!result) return res.status(404).send('Invalid given ID which is not found');
    res.send(result);
});

router.delete("/:id", async (req, res) => {
        const result = await User.findByIdAndRemove(req.params.id);
        if(!result) return res.status(404).send('Invalid given ID which is not found');
        res.send(result);
});

module.exports = router;
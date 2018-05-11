const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');

router.get("/", async (req, res) => {
    const users = await User
    .find()
    .sort({ name: 1});

    res.send(users);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });
    if(!user) return res.status(404).send('Invalid given ID which is not found');
    user = await user.save();
    res.send(user);
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
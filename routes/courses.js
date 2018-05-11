const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Course, validate} = require('../models/course');

router.get("/", async (req, res) => {
    const courses = await Course
    .find()
    .sort({ name: 1});

    res.send(courses);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let course = new Course({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublish: true
    });
    if(!course) return res.status(404).send('Invalid given ID which is not found');
    course = await course.save();
    res.send(course);
});

router.put("/:id", async (req, res) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    const result = await Course.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    },{ new: true});

    if(!result) return res.status(404).send('Invalid given ID which is not found');
    res.send(result);
});

router.delete("/:id", async (req, res) => {
        const result = await Course.findByIdAndRemove(req.params.id);
        if(!result) return res.status(404).send('Invalid given ID which is not found');
        res.send(result);
});

module.exports = router;
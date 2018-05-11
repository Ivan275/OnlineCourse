const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    name: {type:String ,required: true},
    author: {type:String ,required: true},
    tags: [String],
    Date: {type: Date, default: Date.now},
    category: [String],
    isPublish: Boolean
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        author: Joi.string().min(1).max(50).required(),
        tags: Joi.array(),
        isPublish: Joi.boolean()
    };
    return Joi.validate(course,schema);
}

exports.Course = Course;
exports.validate = validateCourse;
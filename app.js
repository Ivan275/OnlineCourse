// load app server using express
// require('express-async-errors');
require('babel-register');
const express = require('express');
const helmet = require('helmet');
const courses = require('./routes/courses');
const users = require('./routes/users');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/qiCourses')
    .then(()=> console.log('Connected to Monogodb'))
    .catch(err => console.log('cannot connect with monogo', err));


app.use(morgan('short'));
app.use(express.json());
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/users', users);
const port = process.env.PORT || 3003

app.listen(port, () => {
    console.log("server is listening 3003")
})

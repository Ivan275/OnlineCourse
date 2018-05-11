// load app server using express
// require('express-async-errors');
require('babel-register');
const express = require('express');
const helmet = require('helmet');
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
require('./prod')(app);

if(!config.get('jwtPrivateKey')) {
    console.log('fatal error, private key is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/qiCourses')
    .then(()=> console.log('Connected to Monogodb'))
    .catch(err => console.log('cannot connect with monogo', err));


app.use(morgan('short'));
app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);
const port = process.env.PORT || 3003

app.listen(port, () => {
    console.log("server is listening 3003")
})

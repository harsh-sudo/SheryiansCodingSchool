const express = require('express'); // import express
const router = express.Router(); // create express router
const courses = require('../controllers/courses_controller'); // import courses controller

router.get('/', courses.getCourses); // get courses
router.use('/liveCourses', require('./liveCourses')); // use live courses

module.exports = router; // export router

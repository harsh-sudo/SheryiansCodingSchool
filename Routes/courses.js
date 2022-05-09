const express = require('express'); // import express
const router = express.Router(); // create express router
const courses = require('../controllers/courses_controller'); // import courses controll
const passport = require('passport'); // import passport


router.get('/',passport.checkAuthentication, courses.getCourses); // get courses
router.get('/lvCourses', courses.getlvCourses); // get courses
router.use('/CoursesDetails', require('./CoursesDetails')); // use live courses

module.exports = router; // export router

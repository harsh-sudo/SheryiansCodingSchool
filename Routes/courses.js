const express = require('express'); // import express
const router = express.Router(); // create express router
const courses = require('../controllers/courses_controller'); // import courses controll
const passport = require('passport'); // import passport


router.get('/', courses.getCourses); // get courses
router.get('/enroll/:id', courses.enrollCourse); // enroll courses
router.get('/enroll/CancelEnrollment/:id', courses.cancelEnrollment); // enroll courses
router.get('/lvCourses', courses.getlvCourses); // get courses
router.use('/CoursesDetails', require('./CoursesDetails')); // use live courses

module.exports = router; // export router

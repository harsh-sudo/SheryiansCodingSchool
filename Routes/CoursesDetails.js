const express = require('express'); // import express
const router = express.Router(); // create express router
const CoursesDetails = require('../Controllers/CoursesDetails_controller.js'); // import live courses controller
const courses = require('../Controllers/courses_controller.js'); // import courses controll


router.get('/:id', CoursesDetails.getCoursesDetails); // get live courses'
router.get('/enroll/:id', courses.enrollCourse); // enroll courses


module.exports = router; // export router
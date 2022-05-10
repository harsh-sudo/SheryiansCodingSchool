const express = require('express'); // import express
const router = express.Router(); // create express router
const CoursesDetails = require('../controllers/CoursesDetails_controller'); // import live courses controller

router.get('/', CoursesDetails.getCoursesDetails); // get live courses')

module.exports = router; // export router
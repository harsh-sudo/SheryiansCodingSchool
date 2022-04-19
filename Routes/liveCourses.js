const express = require('express'); // import express
const router = express.Router(); // create express router
const liveCourses = require('../controllers/liveCourses_controller'); // import live courses controller

router.get('/', liveCourses.getLiveCourses); // get live courses')

module.exports = router; // export router
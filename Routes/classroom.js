const express = require('express'); // import express
const router = express.Router(); // create express router
const passport = require('passport'); // import passport
const classroomController = require('../Controllers/classroom_controller.js'); // import home controller

router.get('/:id',passport.checkAuthentication,classroomController.getClassroom); // get home with authentication')
router.post('/:id/updateProfile',passport.checkAuthentication,classroomController.updateProfile); // get home with authentication')

module.exports = router; // export router

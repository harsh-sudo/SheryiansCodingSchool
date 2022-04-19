const express = require('express'); // import express
const router = express.Router(); // create express router 
const homeController = require('../controllers/home_controller'); // import home controller

// get and post of all routes
router.get('/',homeController.home); // get home
router.use('/campusAmbassador',require('./campusAmbassador')); // use campus ambassador
router.use('/girlsWhoCode',require('./girlsWhoCode')); // use girls who code 
router.use('/adminPanel',require('./adminPanel')); // use admin panel 
router.use('/courses',require('./courses')); // use courses

module.exports = router; // export router

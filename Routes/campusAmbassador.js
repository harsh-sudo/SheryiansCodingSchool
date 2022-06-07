const express = require('express'); // import express
const router = express.Router(); // create express router
const campusAmbassadorController = require('../Controllers/campusAmbassador_controller.js'); // import campus ambassador controller

router.get('/',campusAmbassadorController.getCampusAmbassador); // get campus ambassador


module.exports = router; // export router
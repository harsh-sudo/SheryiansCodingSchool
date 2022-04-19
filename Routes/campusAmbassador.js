const express = require('express'); // import express
const router = express.Router(); // create express router
const campusAmbassadorController = require('../controllers/campusAmbassador_controller'); // import campus ambassador controller

router.get('/',campusAmbassadorController.getCampusAmbassador); // get campus ambassador



module.exports = router; // export router
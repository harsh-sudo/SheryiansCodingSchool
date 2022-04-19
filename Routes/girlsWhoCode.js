const express = require('express'); // import express
const router = express.Router(); // create express router
const girlsWhoCodeController = require('../controllers/girlsWhoCode_controller'); // import girlsWhoCode controller

router.get('/',girlsWhoCodeController.getgirlsWhoCode); // get girlsWhoCode

module.exports = router; // export router;
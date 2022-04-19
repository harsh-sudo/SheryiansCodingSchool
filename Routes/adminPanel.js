const express = require('express'); // import express
const router = express.Router(); // create express router
const adminPanelController = require('../controllers/adminPanel_controller'); // import adminPanel controller

router.get('/', adminPanelController.getadminPanel); // get adminPanel

module.exports = router; // export router
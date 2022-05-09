const express = require('express'); // import express
const router = express.Router(); // create express router
const PaymentPortal_controller = require('../controllers/PaymentPortal_controller'); // import payment portal controller




router.get('/', PaymentPortal_controller.getPaymentPortal); // get payment portal
router.post('/checkOut', PaymentPortal_controller.checkOut); // make payment

module.exports = router; // export router 